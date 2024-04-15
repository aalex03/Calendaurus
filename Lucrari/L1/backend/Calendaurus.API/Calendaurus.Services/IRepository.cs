using Calendaurus.Models;

namespace Calendaurus.Services
{
    public interface IRepository
    {
        Task<IEnumerable<CalendarEntry>> GetAllAsync();
        Task<CalendarEntry?> GetAsync(Guid id);
        Task<CalendarEntry> CreateAsync(CalendarEntry calendarEntry);
        Task<CalendarEntry?> UpdateAsync(CalendarEntry calendarEntry);
        Task DeleteAsync(Guid id);
    }
}
