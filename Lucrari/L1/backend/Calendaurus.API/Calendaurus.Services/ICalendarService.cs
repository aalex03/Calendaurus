using Calendaurus.Models;

namespace Calendaurus.Services
{
    public interface ICalendarService
    {
        public Task<CalendarEntry> Create(CalendarEntry entry);
        public Task<CalendarEntry> Update(CalendarEntry entry);
        public Task Delete(CalendarEntry entry);
    }

    public class CalendarService : ICalendarService
    {
        private readonly IRepository _repository;

        public CalendarService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<CalendarEntry> Create(CalendarEntry entry)
        {
            entry.Id = Guid.NewGuid();
            return await _repository.CreateAsync(entry);
        }

        public async Task<CalendarEntry> Update(CalendarEntry entry)
        {
            return await _repository.UpdateAsync(entry);
        }

        public async Task Delete(CalendarEntry entry)
        {
            await _repository.DeleteAsync(entry.Id);
        }
    }
}
