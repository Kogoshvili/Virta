using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Virta.Services;
using Virta.Services.Interfaces;
using Virta.Database;
using Virta.Repositories;
using Virta.Repositories.Interfaces;
using Virta.Helpers;

namespace Virta.Extensions
{
    public static class AppServiceExtensions
    {
        public static IServiceCollection AddAppServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.AddDbContext<DataContext>(
                options =>
                {
                    options.UseLazyLoadingProxies();
                    options.UseNpgsql(configuration.GetConnectionString("PostgreSql"));
                    // !TODO: REMOVE THIS WHEN DATABASE IS READY
                    options.EnableSensitiveDataLogging(true);
                }
            );

            services.AddScoped<IProductRepository, ProductsRepository>();
            services.AddScoped<ICategoriesRepository, CategoriesRepository>();
            services.AddScoped<IOrdersRepository, OrdersRepository>();
            services.AddScoped<IAttributesRepository, AttributesRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IWishlistRepository, WishlistRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddScoped<IOrdersService, OrdersService>();
            services.AddScoped<IAttributesService, AttributesService>();
            services.AddScoped<ICustomerService, CustomerService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            return services;
        }
    }
}
