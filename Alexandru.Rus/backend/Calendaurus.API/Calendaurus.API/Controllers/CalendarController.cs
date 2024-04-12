using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calendaurus.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly IRepository _repository;

        public CalendarController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await _repository.GetAllAsync();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var result = await _repository.GetAsync(id);

            if (result is null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CalendarEntry calendarEntry)
        {
            var result = await _repository.CreateAsync(calendarEntry);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute]Guid id, [FromBody] CalendarEntry calendarEntry)
        {
            if (!id.Equals(calendarEntry.Id))
            {
                return BadRequest();
            }

            var result = await _repository.UpdateAsync(calendarEntry);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
