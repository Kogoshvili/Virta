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

        Task<List<ProductDTO>> GetProductsAsync(string[] categories, int[] labels, string title, int amount);

        Task<bool> Upsert(ProductUpsert product);
    }
}
