using Virta.Entities;

namespace Virta.Api.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}