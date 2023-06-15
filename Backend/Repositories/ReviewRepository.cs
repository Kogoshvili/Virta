using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Virta.Api.DTO;
using Virta.Repositories.Interfaces;
using Virta.Entities;
using Virta.Database;

namespace Virta.Repositories
{
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        private readonly DataContext _context;

        public ReviewRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<StarsDTO>> GetTotalProductsReviewsAsync()
        {
            return await _context.Reviews.GroupBy(r => r.Stars)
                .Select(r => new StarsDTO { Value = r.Key, Count = r.Count() }).ToListAsync();
        }
    }
}
