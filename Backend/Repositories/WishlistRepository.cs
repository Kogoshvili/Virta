using System;
using System.Threading.Tasks;
using Virta.Data.Interfaces;
using Virta.Entities;

namespace Virta.Data
{
    public class WishlistRepository : BaseRepository<Wishlist>, IWishlistRepository
    {
        private readonly DataContext _context;

        public WishlistRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Wishlist> GetWishlistAsync(Guid id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);

            if (wishlist == null) {
                Add(new Wishlist { UserId = id });

                if (await SaveAll())
                    return await _context.Wishlists.FindAsync(id);
            }

            return wishlist;
        }
    }
}
