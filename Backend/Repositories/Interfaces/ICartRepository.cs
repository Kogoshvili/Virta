using System;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Data.Interfaces
{
    public interface ICartRepository : IBaseRepository<Cart>
    {
       Task<Cart> GetCart(Guid id);
    }
}
