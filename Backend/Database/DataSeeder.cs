using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Virta.Entities;

namespace Virta.Database
{
    public class DataSeeder : IdentityDbContext<User, Role, System.Guid>
    {
    }
}
