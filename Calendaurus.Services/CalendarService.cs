using Calendaurus.Models;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net.Serialization;

namespace Calendaurus.Services;

public class CalendarService : ICalendarService
{
    public IRepository<CalendarEntry> _repository;
    public CalendarService(IRepository<CalendarEntry> repository)
    {
        _repository = repository;
    }

    public async Task<CalendarEntry?> CreateAsync(User user, CalendarEntryDto entryDto)
    {
        var entry = new CalendarEntry
        {
            Id = Guid.NewGuid(),
            Title = entryDto.Title,
            Description = entryDto.Description,
            Start = entryDto.Start,
            Created = DateTime.Now,
            Updated = entryDto.Updated,
            Type = entryDto.Type,
            Location = entryDto.Location,
            UserId = user.Id,
            User = user
        };
        var calendarEntries = await _repository.GetAsync(x => x.Location == entry.Location && entry.Start >= x.Start);
        return calendarEntries.Any() ? null : await _repository.CreateAsync(entry);
    }

    public async Task<bool> DeleteAsync(User user, Guid id)
    {
        var entry = await _repository.GetAsync(id);
        if (entry == null || entry.UserId != user.Id)
        {
            return false;
        }
        return await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<CalendarEntry>> GetAllAsync(User user)
    {
        var entries = await _repository.GetAllAsync();
        return entries.Where(x => x.UserId == user.Id);
    }

    public async Task<CalendarEntry?> GetAsync(User user, Guid id)
    {
        var entry = await _repository.GetAsync(id);
        return entry?.UserId == user.Id ? entry : null;
    }

    public async Task<CalendarEntry?> UpdateAsync(User user, Guid id, CalendarEntryDto entryDto)
    {
        var entry = await _repository.GetAsync(id);
        if (entry == null || entry.UserId != user.Id)
        {
            return null;
        }
        entry.Title = entryDto.Title;
        entry.Description = entryDto.Description;
        entry.Start = entryDto.Start;
        entry.Updated = entryDto.Updated;
        entry.Type = entryDto.Type;
        entry.Location = entryDto.Location;
        return await _repository.UpdateAsync(entry);
    }

    public async Task<string> ExportCalendar(User user)
    {
        var entries = await _repository.GetAllAsync();
        var userEntries = entries.Where(x => x.UserId == user.Id);
        var calendar = new Calendar();
        foreach (var entry in entries)
        {
            var @event = new CalendarEvent()
            {
                Start = new CalDateTime(entry.Start),
                End = new CalDateTime(entry.Start.AddHours(2)),
                Summary = entry.Title,
                Description = entry.Description,
                Location = entry.Location,
                Created = new CalDateTime(entry.Created ?? DateTime.Now),
                LastModified = new CalDateTime(entry.Updated ?? DateTime.Now),
                Uid = entry.Id.ToString()
            };
            calendar.Events.Add(@event);
        }

        var serializer = new CalendarSerializer();
        return serializer.SerializeToString(calendar);
    }
}
