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

    public async Task<CalendarEntry?> CreateAsync(CalendarEntryDto entryDto, Guid userId)
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
            UserId = userId
        };
        var calendarEntries = await _repository.GetAsync(x => x.Location == entry.Location && entry.Start >= x.Start);
        return calendarEntries.Any() ? null : await _repository.CreateAsync(entry);
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

    public async Task<CalendarEntry?> UpdateAsync(Guid id, CalendarEntryDto entryDto)
    {
        var entry = await _repository.GetAsync(id);
        if (entry == null)
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

    public async Task<string> ExportCalendar(Guid userId)
    {
        var entries = await _repository.GetAllAsync();
        var userEntries = entries.Where(x => x.UserId == userId);
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
