using System.Linq.Expressions;
using Calendaurus.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Services;

public class CalendarEntryEfRepository<T> : IRepository<CalendarEntry>
{
    public readonly CalendaurusContext _context;
    public CalendarEntryEfRepository(CalendaurusContext context)
    {
        _context = context;
    }
    public async Task<CalendarEntry> CreateAsync(CalendarEntry entity)
    {
        var result = await _context.CalendarEntries.AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var result = _context.CalendarEntries.Remove(new CalendarEntry { Id = id });
        await _context.SaveChangesAsync();
        return result.State is EntityState.Deleted;
    }

    public async Task<IEnumerable<CalendarEntry>> GetAllAsync()
    {
        return await _context.CalendarEntries.ToListAsync();
    }

    public async Task<CalendarEntry?> GetAsync(Guid id)
    {
        return await _context.CalendarEntries.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<CalendarEntry>> GetAsync(Expression<Func<CalendarEntry,bool>> predicate)
    {
        return await _context.CalendarEntries.Where(predicate).ToListAsync();
    }

    public async Task<CalendarEntry?> UpdateAsync(CalendarEntry entity)
    {
        var result = _context.CalendarEntries.Update(entity);
        await _context.SaveChangesAsync();
        return result.Entity;
    }
}