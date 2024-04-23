using System.ComponentModel.DataAnnotations;

namespace Calendaurus.Models
{
    public class CalendarEntry
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(200)]
        public string Title { get; set; } = default!;
        [StringLength(2000)]
        public string? Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public short Type { get; set; }
        [StringLength(200)]
        public string? Location { get; set; }
    }
}