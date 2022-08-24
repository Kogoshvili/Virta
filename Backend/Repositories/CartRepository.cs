using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Virta.Data.Interfaces;
using Virta.Entities;

namespace Virta.Data
{
    public class CartRepository : BaseRepository<Cart>, ICartRepository
    {
        private readonly DataContext _context;

        public CartRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Cart> GetCart(Guid id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null) {
                Add(new Cart { UserId = id });

                if (await SaveAll())
                    return await _context.Carts.FindAsync(id);
            }

            return cart;
        }
    }
}
