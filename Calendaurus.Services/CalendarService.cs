using Calendaurus.Models;

namespace Calendaurus.Services;

public class CalendarService : ICalendarService
{
    public IRepository<CalendarEntry> _repository;
    public CalendarService(IRepository<CalendarEntry> repository)
    {
        _repository = repository;
    }
    
    public async Task<CalendarEntry?> CreateAsync(CalendarEntry entry, Guid userId)
    {
        var calendarEntries = await _repository.GetAsync(x => x.Location == entry.Location && (entry.Start >= x.Start && entry.End <= x.End));
        if(calendarEntries.Any())
        {
            return null;
        }
        return await _repository.CreateAsync(entry);
    }

    public Task<bool> DeleteAsync(Guid id)
    {
        return _repository.DeleteAsync(id);
    }

    public Task<IEnumerable<CalendarEntry>> GetAllAsync()
    {
        return _repository.GetAllAsync();
    }

    public Task<CalendarEntry?> GetAsync(Guid id)
    {
        return _repository.GetAsync(id);
    }

    public Task<CalendarEntry?> UpdateAsync(CalendarEntry entry)
    {
        return _repository.UpdateAsync(entry);
    }
}