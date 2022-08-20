using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Virta.Data.Interfaces;
using Virta.Entities;

namespace Virta.Data
{
    public class CategoriesRepository : BaseRepository<Category>, ICategoriesRepository
    {
        private readonly DataContext _context;

        public CategoriesRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Category> GetCategoryAsync(string category)
        {
            return await _context.Categories.FirstAsync(c => c.Name == category);
        }

        public async Task<Category> GetCategoryAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.OrderByDescending(a => a.Priority).ToListAsync();
        }

        public async Task<List<Category>> GetParentCategoriesAsync()
        {
            return await _context.Categories.Where(c => c.Parent == null).OrderByDescending(a => a.Priority).ToListAsync();
        }

        public async Task<List<Category>> GetCategoriesByNameAsync(string order = "ASC")
        {
            if (order == "ASC")
                return await _context.Categories.OrderBy(a => a.Name).ToListAsync();

            return await _context.Categories.OrderByDescending(a => a.Name).ToListAsync();
        }

        public async Task<int> GetCategoryProductCountAsync(int id)
        {
            return await _context.Categories.Where(c => c.Id == id).Select(c => c.Products.Count).FirstAsync();
        }
    }
}
