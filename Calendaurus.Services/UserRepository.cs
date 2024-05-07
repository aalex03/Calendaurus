using Calendaurus.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Services;

public class UserRepository : IUserRepository
{
    private readonly CalendaurusContext _dbContext;

    public UserRepository(CalendaurusContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}