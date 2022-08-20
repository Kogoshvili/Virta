using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Data.Interfaces
{
    public interface ICategoriesRepository : IBaseRepository<Category>
    {
        Task<Category> GetCategoryAsync(int id);
        Task<Category> GetCategoryAsync(string category);
        Task<List<Category>> GetCategoriesAsync();
        Task<List<Category>> GetParentCategoriesAsync();
        Task<List<Category>> GetCategoriesByNameAsync(string order = "ASC");
        Task<int> GetCategoryProductCountAsync(int id);
    }
}
