namespace Calendaurus.Models
{
    public class CalendarEntry
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public DateTimeOffset CreatedTimeUtc { get; set; }
        public DateTimeOffset? UpdatedTimeUtc { get; set; }
        public short Type { get; set; }
        public string Location { get; set; } = default!;
    }
}
