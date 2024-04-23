namespace Calendaurus.API.Controllers;

using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/[controller]")]
public class CalendarController : ControllerBase
{
    private readonly ICalendarService _calendarService;
    public CalendarController(ICalendarService calendarService)
    {
        _calendarService = calendarService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _calendarService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
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
        var result = await _calendarService.CreateAsync(entry);
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