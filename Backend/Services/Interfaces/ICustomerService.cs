using System;
using System.Threading.Tasks;
using Virta.Models;

namespace Virta.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<bool> UpsertCartAsync(CartUpsert cart, Guid id);
        Task<bool> UpsertWishlistAsync(WishlistUpsert wishlist, Guid id);
    }
}
