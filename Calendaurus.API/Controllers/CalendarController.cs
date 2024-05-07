namespace Calendaurus.API.Controllers;

using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        if(user is null)
        {
            return BadRequest();
        }
        var result = await _calendarService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _calendarService.GetAsync(id);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CalendarEntry entry)
    {
        var currentUser = User.Identity!.Name!;
        var user = await _userRepository.GetByEmailAsync(currentUser);
        var result = await _calendarService.CreateAsync(entry, user.Id);
        if (result == null)
        {
            return BadRequest();
        }
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CalendarEntry entry)
    {
        var result = await _calendarService.UpdateAsync(entry);
        if (result == null)
        {
            return BadRequest();
        }
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _calendarService.DeleteAsync(id);
        if (!result)
        {
            return BadRequest();
        }
        return Ok();
    }
}