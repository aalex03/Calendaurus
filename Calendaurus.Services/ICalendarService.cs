namespace Calendaurus.Services;
using Calendaurus.Models;
public interface ICalendarService
{
    Task<CalendarEntry?> GetAsync(Guid id);
    Task<IEnumerable<CalendarEntry>> GetAllAsync();
    Task<CalendarEntry?> CreateAsync(CalendarEntryDto entryDto, Guid userId);
    Task<CalendarEntry?> UpdateAsync(Guid id, CalendarEntryDto entryDto);
    Task<bool> DeleteAsync(Guid id);
}

