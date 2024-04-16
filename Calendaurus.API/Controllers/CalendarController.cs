namespace Calendaurus.API.Controllers;

using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/[controller]")]
public class CalendaurusController : ControllerBase
{
    private readonly IRepository<CalendarEntry> _repository;
    public CalendaurusController(IRepository<CalendarEntry> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _repository.GetAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CalendarEntry entry)
    {
        return Ok(await _repository.CreateAsync(entry));
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CalendarEntry entry)
    {
        if(id != entry.Id)
        {
            return BadRequest();
        }
        return Ok(await _repository.UpdateAsync(entry));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return Ok(await _repository.DeleteAsync(id));
    }
}