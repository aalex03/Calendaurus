using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Models;

public class CalendaurusContext : DbContext
{
    public DbSet<CalendarEntry> CalendarEntries { get; set; }
    public DbSet<User> Users { get; set; }
    public CalendaurusContext(DbContextOptions<CalendaurusContext> options) : base(options)
    {
    }
}