using System;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Repositories.Interfaces
{
    public interface IWishlistRepository : IBaseRepository<Wishlist>
    {
       Task<Wishlist> GetWishlistAsync(Guid id);
    }
}
