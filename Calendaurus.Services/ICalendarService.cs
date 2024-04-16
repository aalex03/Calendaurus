namespace Calendaurus.Services;
using Calendaurus.Models;
public interface ICalendarService
{
    Task<CalendarEntry> CreateAsync(CalendarEntry entry);
    Task<CalendarEntry> UpdateAsync(CalendarEntry entry);
    Task<bool> DeleteAsync(Guid id);
}

