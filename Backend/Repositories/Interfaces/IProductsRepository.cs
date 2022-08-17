using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Data.Interfaces
{
    public interface IProductsRepository : IBaseRepository<Product>
    {
        Task<Product> GetProduct(Guid id);
        Task<List<Product>> GetProductsAsync(string[] categories = null, int[] labels = null, string title = null, int? amount = null);
    }
}
