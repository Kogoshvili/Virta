using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Models;

namespace Virta.Services.Interfaces
{
    public interface ICategoriesService
    {
        Task<List<CategoryDTO>> GetCategoriesAsync();
        Task<bool> UpsertAsync(CategoryUpsert category);
    }
}
