namespace Calendaurus.Models;
public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = default!;
}