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

        public async Task<Category> GetCategory(string category)
        {
            return await _context.Categories.FirstAsync(c => c.Name == category);
        }

        public async Task<Category> GetCategory(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<List<Category>> GetCategories(int amount = 10)
        {
            return await _context.Categories.OrderByDescending(a => a.Priority).Take(amount).ToListAsync();
        }

        public async Task<List<Category>> GetCategoriesByName(string order = "ASC", int amount = 10)
        {
            if (order == "ASC")
                return await _context.Categories.OrderBy(a => a.Name).Take(amount).ToListAsync();

            return await _context.Categories.OrderByDescending(a => a.Name).Take(amount).ToListAsync();
        }
    }
}
