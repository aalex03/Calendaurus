namespace Calendaurus.API.Controllers;

using System.Text;
using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CalendarController : ControllerBase
{
    private readonly ICalendarService _calendarService;
    private readonly IUserRepository _userRepository;
    public CalendarController(ICalendarService calendarService, IUserRepository userRepository)
    {
        _calendarService = calendarService;
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var currentUser = User.Identity!.Name!;
        var user = await _userRepository.GetByEmailAsync(currentUser);
        return user is null ? BadRequest() : Ok(await _calendarService.GetAllAsync());
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _calendarService.GetAsync(id);
        return result is null ? BadRequest() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CalendarEntryDto entryDto)
    {
        var currentUser = User.Identity!.Name!;
        var user = await _userRepository.GetByEmailAsync(currentUser);
        return user is null ? BadRequest() : Ok(await _calendarService.CreateAsync(entryDto,user.Id));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CalendarEntryDto entryDto)
    {
        var result = await _calendarService.UpdateAsync(id, entryDto);
        return result is null ? BadRequest() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _calendarService.DeleteAsync(id);
        return result is false ? BadRequest() : Ok();
    }
    [HttpGet("{userId}/export")]
    public async Task<IActionResult> GetExportedCalendar([FromRoute] Guid userId)
    {
        var calendar = await _calendarService.ExportCalendar(userId);
        if(calendar.IsNullOrEmpty()) return BadRequest();
        var content = Encoding.UTF8.GetBytes(calendar);
        return File(content, "text/calendar", "calendar.ics");
    }
}