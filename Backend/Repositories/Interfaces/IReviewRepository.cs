using System.Collections.Generic;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Entities;

namespace Virta.Data.Interfaces
{
    public interface IReviewRepository: IBaseRepository<Review>
    {
        Task<List<StarsDTO>> GetTotalProductsReviewsAsync();
    }
}
