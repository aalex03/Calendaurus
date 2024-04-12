using Calendaurus.Models;

namespace Calendaurus.Services
{
    public class CalendarEntryRepository : IRepository
    {
        private static List<CalendarEntry> _calendarEntries = new List<CalendarEntry>();

        public Task<CalendarEntry> CreateAsync(CalendarEntry calendarEntry)
        {
            calendarEntry.Id = Guid.NewGuid();
            _calendarEntries.Add(calendarEntry);
            return Task.FromResult(calendarEntry);
        }

        public Task DeleteAsync(Guid id)
        {
            _calendarEntries.RemoveAll(x => x.Id == id);
            return Task.CompletedTask;
        }

        public Task<IEnumerable<CalendarEntry>> GetAllAsync()
        {
            return Task.FromResult(_calendarEntries.AsEnumerable());
            
        }

        public Task<CalendarEntry?> GetAsync(Guid id)
        {
            var item = _calendarEntries.Find(x => x.Id == id);
            return Task.FromResult(item);
        }

        public Task<CalendarEntry?> UpdateAsync(CalendarEntry calendarEntry)
        {
            var entity = _calendarEntries.Find(x => x.Id == calendarEntry.Id);
            if (entity != null)
            {
                _calendarEntries.Remove(entity);
                _calendarEntries.Add(calendarEntry);
                return Task.FromResult(calendarEntry);
            }

            return Task.FromResult(entity);
        }
    }
}
