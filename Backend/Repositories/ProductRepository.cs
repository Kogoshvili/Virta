using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Data.Interfaces;
using Virta.Entities;

namespace Virta.Data
{
    public class ProductsRepository : BaseRepository<Product>, IProductRepository
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

        public async Task<List<Product>> GetProductsByIds(Guid[] productIds)
        {
            return await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync();
        }

        public async Task<List<Product>> GetProductsAsync(
            string[] categories = null,
            int[] labels = null,
            string title = null,
            int? amount = null,
            int? page = null
        ){
            return await GetProductsQuery(categories, labels, title, amount, page).ToListAsync();
        }

        public async Task<int> GetProductsCountAsync(
            string[] categories = null,
            int[] labels = null,
            string title = null
        ) {
            return await GetProductsQuery(categories, labels, title).CountAsync();
        }

        protected IQueryable<Product> GetProductsQuery(
            string[] categories = null,
            int[] labels = null,
            string title = null,
            int? amount = null,
            int? page = null
        )
        {
            var query = _context.Products.AsQueryable();

            if (categories != null && categories.Length > 0) {
                query = query.Where(p => p.Categories.Where(c => categories.Contains(c.Name)).Any());
            }

            if(labels != null && labels.Length > 0) {
                query = query.Where(p => labels.ToList().Contains((int)p.Label));
            }

            if (title != null && title != "") {
                query = query.Where(p => p.Title.ToLower().Contains(title.ToLower())).OrderByDescending(p => p.Title);
            } else {
                query = query.OrderByDescending(p => p.CreatedAt);
            }

            if (page.HasValue && page > 0) {
                query = query.Skip((page.Value - 1) * (amount ?? 10));
            }

            if (amount.HasValue && amount > 0) {
                query = query.Take(amount.Value);
            }

            return query;
        }

        public async Task<List<LabelDTO>> GetProductsLabels()
        {
            return await _context.Products.GroupBy(p => p.Label)
                .Select(g => new LabelDTO {
                    Name = g.Key.ToString(),
                    Value = (int)g.Key,
                    Count = g.Count()
                }).ToListAsync();
        }
    }
}
