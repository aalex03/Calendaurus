using Calendaurus.Models;

namespace Calendaurus.Services;

public class CalendarService : ICalendarService
{
    public IRepository<CalendarEntry> _repository;
    public CalendarService(IRepository<CalendarEntry> repository)
    {
        _repository = repository;
    }
    
    public Task<CalendarEntry> CreateAsync(CalendarEntry entry)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<CalendarEntry> UpdateAsync(CalendarEntry entry)
    {
        throw new NotImplementedException();
    }
}