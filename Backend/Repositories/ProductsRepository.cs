using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Virta.Data.Interfaces;
using Virta.Entities;

namespace Virta.Data
{
    public class ProductsRepository : BaseRepository<Product>, IProductsRepository
    {
        private readonly DataContext _context;

        public ProductsRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Product> GetProduct(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<List<Product>> GetProductsAsync(string[] categories = null, int[] labels = null, string title = null, int? amount = null)
        {
            var result = _context.Products.AsQueryable();

            if (categories != null && categories.Length > 0) {
                result = result.Where(p => p.Categories.Where(c => categories.Contains(c.Name)).Any());
            }

            if(labels != null && labels.Length > 0) {
                result = result.Where(p => labels.ToList().Contains((int)p.Label));
            }

            if (title != null && title != "") {
                result = result.Where(p => p.Title.Contains(title)).OrderByDescending(p => p.Title);
            } else {
                result = result.OrderByDescending(p => p.CreatedAt);
            }

            if (amount.HasValue && amount > 0) {
                result = result.Take(amount.Value);
            }

            return await result.ToListAsync();
        }
    }
}
