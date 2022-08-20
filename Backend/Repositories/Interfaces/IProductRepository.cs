using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Entities;

namespace Virta.Data.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<Product> GetProduct(Guid id);
        Task<List<Product>> GetProductsAsync(string[] categories = null, int[] labels = null, string title = null, int? amount = null, int? page = null);
        Task<int> GetProductsCountAsync(string[] categories = null, int[] labels = null, string title = null);
        Task<List<LabelDTO>> GetProductsLabels();
    }
}
