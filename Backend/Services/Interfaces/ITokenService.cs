using System.Threading.Tasks;
using Virta.Entities;

namespace Virta.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateAsync(User user);
    }
}
