using System;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Repositories.Interfaces
{
    public interface ICartRepository : IBaseRepository<Cart>
    {
       Task<Cart> GetCart(Guid id);
    }
}
