namespace Calendaurus.Models
{
    public class CalendarEntry
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public short Type { get; set; }
        public string? Location { get; set; }
    }
}