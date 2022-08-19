using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Models;

namespace Virta.Services.Interfaces
{
    public interface IProductService
    {
        Task<ProductDTO> GetProduct(Guid id);

        Task<List<ProductDTO>> GetProductsAsync(string[] categories = null, int[] labels = null, string title = null, int? amount = null, int? page = null);

        Task<bool> Upsert(ProductUpsert product);
    }
}
