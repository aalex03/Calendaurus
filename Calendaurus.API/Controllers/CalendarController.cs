namespace Calendaurus.API.Controllers;

using System.Security.Claims;
using System.Text;
using Calendaurus.API.Migrations;
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
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null) return BadRequest("Unauthorized");
        var user = await _userRepository.GetByEmailAsync(email);
        return user is null ? BadRequest("User does not exist") : Ok(await _calendarService.GetAllAsync(user));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null) return BadRequest("Unauthorized");
        var user = await _userRepository.GetByEmailAsync(email);
        if (user is null) return BadRequest("User does not exist");
        var result = await _calendarService.GetAsync(user, id);
        return result is null ? BadRequest("Entry does not exist") : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CalendarEntryDto entryDto)
    {
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null) return BadRequest("Unauthorized");
        var user = await _userRepository.GetByEmailAsync(email);
        return user is null ? BadRequest("User does not exist") : Ok(await _calendarService.CreateAsync(user, entryDto));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CalendarEntryDto entryDto)
    {
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null) return BadRequest("Unauthorized");
        var user = await _userRepository.GetByEmailAsync(email);
        if (user is null) return BadRequest("User does not exist");
        var result = await _calendarService.UpdateAsync(user, id, entryDto);
        return result is null ? BadRequest() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null) return BadRequest();
        var user = await _userRepository.GetByEmailAsync(email);
        if (user is null) return BadRequest();
        var result = await _calendarService.DeleteAsync(user, id);
        return result is false ? BadRequest() : Ok();
    }
    [HttpGet("{userEmail}/export")]
    public async Task<IActionResult> GetExportedCalendar([FromRoute] string userEmail)
    {
        var email = User.FindFirst(x => x.Type == "email")?.Value;
        if (email is null || email != userEmail) return BadRequest();
        var user = await _userRepository.GetByEmailAsync(userEmail);
        if(user is null) return BadRequest();
        var calendar = await _calendarService.ExportCalendar(user);
        if(calendar.IsNullOrEmpty()) return BadRequest();
        var content = Encoding.UTF8.GetBytes(calendar);
        return File(content, "text/calendar", "calendar.ics");
    }
    [HttpPost("signUp/{userEmail}")]
    public async Task<IActionResult> SignUp([FromRoute] string userEmail)
    {
        var currentUserEmail = User.FindFirst(x => x.Type == "email")?.Value;
        if (currentUserEmail is null || userEmail != currentUserEmail) return BadRequest();
        var user = await _userRepository.GetByEmailAsync(userEmail);
        if (user is not null) return BadRequest();
        var result = await _userRepository.CreateAsync(userEmail);
        return Ok(result);
    }
}