using System.Linq.Expressions;
using Calendaurus.Models;

namespace Calendaurus.Services;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetAsync(Guid id);
    Task<IEnumerable<T>> GetAsync(Expression<Func<CalendarEntry,bool>> predicate);
    Task<T> CreateAsync(T entity);
    Task<T?> UpdateAsync(T entity);
    Task<bool> DeleteAsync(Guid id);
}