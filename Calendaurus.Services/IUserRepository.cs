using Calendaurus.Models;

namespace Calendaurus.Services;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateAsync(string email);
}