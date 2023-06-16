using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Virta.Entities;

namespace Virta.Database
{
    public static class DataSeeder
    {
        public static void Seed(ModelBuilder builder)
        {
            AdminSeeder(builder);
            CategoriesSeeder(builder);
            ProductsSeeder(builder);
        }

        private static void AdminSeeder(ModelBuilder builder)
        {
            var adminId = new Guid("0390123d-b8ea-4cf5-98f3-26f62f543fb6");
            var roleId = new Guid("5fae1074-fbdd-425e-a53c-69eca4e04e08");

            // seed admin role
            builder.Entity<Role>().HasData(new Role
            {
                Name = "Admin",
                NormalizedName = "ADMIN",
                Id = roleId,
                ConcurrencyStamp = roleId.ToString()
            });

            // create admin user
            User adminUser = new User()
            {
                Id = adminId,
                FirstName = "Admin",
                LastName = "Admin",
                Email = "admin@admin.com",
                EmailConfirmed = true,
                UserName = "Admin",
                NormalizedUserName = "ADMIN"
            };

            // set user password
            PasswordHasher<User> ph = new PasswordHasher<User>();
            adminUser.PasswordHash = ph.HashPassword(adminUser, "admin");

            // seed user
            builder.Entity<User>().HasData(adminUser);

            // set user role to admin
            builder.Entity<IdentityUserRole<Guid>>().HasData(new IdentityUserRole<Guid>
            {
                RoleId = roleId,
                UserId = adminId
            });
        }

        private static void CategoriesSeeder(ModelBuilder builder)
        {
            var categories = new Category[] {
                new Category {
                    Id = 1,
                    Name = "vegetables",
                    Title = "Vegetables",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 2,
                    Name = "fruits",
                    Title = "Fruits",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 3,
                    Name = "chicken",
                    Title = "Chicken",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 4,
                    Name = "beef",
                    Title = "Beef",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 5,
                    Name = "pork",
                    Title = "Pork",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 6,
                    Name = "fish",
                    Title = "Fish",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 7,
                    Name = "seafood",
                    Title = "Seafood",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 8,
                    Name = "dairy",
                    Title = "Dairy",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 9,
                    Name = "eggs",
                    Title = "Eggs",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 14,
                    Name = "snacks",
                    Title = "Snacks",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 15,
                    Name = "sweets",
                    Title = "Sweets",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 16,
                    Name = "soft_drinks",
                    Title = "Soft Drinks",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 17,
                    Name = "alcohol",
                    Title = "Alcohol",
                    Visible = true,
                    Priority = 1
                },
            };

            builder.Entity<Category>().HasData(categories);
        }

        private static void ProductsSeeder(ModelBuilder builder)
        {
            var products = new List<Product> {
                new Product {
                    Id = Guid.NewGuid(),
                    Title = "exercitation ipsum exercitation in deserunt",
                    Price = 54.63M,
                    Description = "Velit exercitation aliquip irure labore reprehenderit aute elit cillum ad consectetur dolor in excepteur. Magna consectetur qui aliquip est adipisicing laboris ex deserunt sunt duis minim do. Cupidatat aliqua enim eiusmod voluptate Lorem nulla Lorem laborum minim proident nostrud.",
                    SKU = "60ddf30e02d3a810c7f04761",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = Guid.NewGuid(),
                    Title = "dolor laborum laborum laborum laborum",
                    Price = 51.63M,
                    Description = "Velit exercitation aliquip irure labore reprehenderit aute elit cillum ad consectetur dolor in excepteur. Magna consectetur qui aliquip est adipisicing laboris ex deserunt sunt duis minim do. Cupidatat aliqua enim eiusmod voluptate Lorem nulla Lorem laborum minim proident nostrud.",
                    SKU = "60ddf30e02d3a810c7f04762",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = Guid.NewGuid(),
                    Title = "Excepteur laborum laborum laborum laborum",
                    Price = 1.6M,
                    Description = "Velit exercitation aliquip irure labore reprehenderit aute elit cillum ad consectetur dolor in excepteur. Magna consectetur qui aliquip est adipisicing laboris ex deserunt sunt duis minim do. Cupidatat aliqua enim eiusmod voluptate Lorem nulla Lorem laborum minim proident nostrud.",
                    SKU = "60ddf30e02d3a810c7f04763",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = Guid.NewGuid(),
                    Title = "Excepteur laborum laborum laborum laborum",
                    Price = 45.6M,
                    Description = "Velit exercitation aliquip irure labore reprehenderit aute elit cillum ad consectetur dolor in excepteur. Magna consectetur qui aliquip est adipisicing laboris ex deserunt sunt duis minim do. Cupidatat aliqua enim eiusmod voluptate Lorem nulla Lorem laborum minim proident nostrud.",
                    SKU = "60ddf30e02d3a810c7f04764",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
            };

            builder.Entity<Product>().HasData(products);

            var categories = new List<CategoryProduct> {
                new CategoryProduct {
                    CategoryId = 1,
                    ProductId = products[0].Id
                },
                new CategoryProduct {
                    CategoryId = 2,
                    ProductId = products[2].Id
                },
                new CategoryProduct {
                    CategoryId = 3,
                    ProductId = products[2].Id
                },
                new CategoryProduct {
                    CategoryId = 4,
                    ProductId = products[3].Id
                },
                new CategoryProduct {
                    CategoryId = 5,
                    ProductId = products[1].Id
                },
            };

            builder.Entity<CategoryProduct>().HasData(categories);
        }
    }
}

// The seed entity for entity type 'Product' with the key value 'Id:d5bd33d1-5a7c-45e1-a14e-89892d9c0839' cannot be added because it has the navigation 'Categories' set.
// To seed relationships, add the entity seed to 'CategoryProduct (Dictionary<string, object>)' and specify the foreign key values {'ProductsId'}.
