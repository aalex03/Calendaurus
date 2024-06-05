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
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public short? Type { get; set; }
        [StringLength(200)]
        public string? Location { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = default!;
    }

    public record CalendarEntryDto(
        string Title,
        string? Description,
        DateTime Start,
        DateTime Created,
        DateTime? Updated,
        short? Type,
        string? Location);
}