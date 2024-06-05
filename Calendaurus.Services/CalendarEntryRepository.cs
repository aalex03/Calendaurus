using System.Linq.Expressions;
using Calendaurus.Models;

namespace Calendaurus.Services;

public class CalendarEntryRepository<T> : IRepository<CalendarEntry>
{
    public static List<CalendarEntry> _calendarEntries = [
        new CalendarEntry
        {
            Id = Guid.NewGuid(),
            Title = "Test",
            Description = "Test",
            Start = DateTime.Now,
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Type = 1,
            Location = "Test"
        },
        new CalendarEntry
        {
            Id = Guid.NewGuid(),
            Title = "Test2",
            Description = "Test2",
            Start = DateTime.Now,
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Type = 2,
            Location = "Test2"
        }
    ];
    public Task<CalendarEntry> CreateAsync(CalendarEntry entity)
    {
        _calendarEntries.Add(entity);
        return Task.FromResult(entity);
    }

    public Task<bool> DeleteAsync(Guid id)
    {
        var entry = _calendarEntries.FirstOrDefault(x => x.Id == id);
        if (entry == null)
        {
            return Task.FromResult(false);
        }
        _calendarEntries.Remove(entry);
        return Task.FromResult(true);
    }

    public Task<IEnumerable<CalendarEntry>> GetAllAsync()
    {
        return Task.FromResult(_calendarEntries.AsEnumerable());
    }

    public Task<CalendarEntry?> GetAsync(Guid id)
    {
        return Task.FromResult(_calendarEntries.FirstOrDefault(x => x.Id == id));
    }

    public Task<IEnumerable<CalendarEntry>> GetAsync(Expression<Func<CalendarEntry,bool>> predicate)
    {
        return Task.FromResult(_calendarEntries.Where(predicate.Compile()).AsEnumerable());
    }

    public Task<CalendarEntry?> UpdateAsync(CalendarEntry entity)
    {
        var entry = _calendarEntries.Find(x => x.Id == entity.Id);
        if(entry is not null)
        {
            _calendarEntries.Remove(entry);
            _calendarEntries.Add(entity);
            return Task.FromResult<CalendarEntry?>(entity);
        }
        return Task.FromResult(entry);
    }
}