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

    public async Task<User> CreateAsync(string email)
    {
        var user = await _dbContext.Users.AddAsync(new User{
            Id = Guid.NewGuid(),
            Email = email
        });
        await _dbContext.SaveChangesAsync();
        return user.Entity;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}