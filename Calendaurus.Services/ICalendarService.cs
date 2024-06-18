namespace Calendaurus.Services;
using Calendaurus.Models;
public interface ICalendarService
{
    Task<CalendarEntry?> GetAsync(User user, Guid id);
    Task<IEnumerable<CalendarEntry>> GetAllAsync(User user);
    Task<CalendarEntry?> CreateAsync(User user, CalendarEntryDto entryDto);
    Task<CalendarEntry?> UpdateAsync(User user, Guid id, CalendarEntryDto entryDto);
    Task<bool> DeleteAsync(User user, Guid id);
    Task<string> ExportCalendar(User user);
}

