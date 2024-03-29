using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Repositories.Interfaces
{
    public interface IOrdersRepository : IBaseRepository<Order>
    {
        Task<Order> GetOrder(int Id);
        Task<List<Order>> GetOrders();
    }
}
