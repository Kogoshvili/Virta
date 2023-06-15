using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Repositories.Interfaces;
using Virta.Entities;
using Virta.Database;

namespace Virta.Repositories
{
    public class OrdersRepository : BaseRepository<Order>, IOrdersRepository
    {
        private readonly DataContext _context;

        public OrdersRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Order> GetOrder(int Id)
        {
            return await _context.Orders.FindAsync(Id);
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }
    }
}
