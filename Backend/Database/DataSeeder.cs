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
                    Id = 10,
                    Name = "snacks",
                    Title = "Snacks",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 11,
                    Name = "sweets",
                    Title = "Sweets",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 12,
                    Name = "soft_drinks",
                    Title = "Soft Drinks",
                    Visible = true,
                    Priority = 1
                },
                new Category {
                    Id = 13,
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
            var guids = GenerateGuids(13);

            var products = new List<Product> {
                new Product {
                    Id = guids[0],
                    Title = "Fresh Organic Broccoli",
                    Price = 2.99M,
                    Description = "Locally grown, pesticide-free broccoli. High in vitamins and fiber.",
                    SKU = "60ddf30e02d3a810c7f04762",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[1],
                    Title = "Sweet Juicy Watermelon",
                    Price = 4.99M,
                    Description = "Large, ripe watermelon bursting with refreshing sweetness.",
                    SKU = "60ddf30e02d3a810c7f04763",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[2],
                    Title = "Boneless Skinless Chicken Breast",
                    Price = 6.99M,
                    Description = "Tender and lean chicken breast, perfect for grilling or baking.",
                    SKU = "60ddf30e02d3a810c7f04764",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[3],
                    Title = "Grass-Fed Ribeye Steak",
                    Price = 12.99M,
                    Description = "Prime cut ribeye steak from grass-fed cattle. Rich in flavor and tender.",
                    SKU = "60ddf30e02d3a810c7f04765",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[4],
                    Title = "Succulent Pork Chops",
                    Price = 9.99M,
                    Description = "Juicy and flavorful pork chops, perfect for grilling or pan-frying.",
                    SKU = "60ddf30e02d3a810c7f04766",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[5],
                    Title = "Wild-Caught Salmon Fillet",
                    Price = 8.99M,
                    Description = "Fresh salmon fillet sustainably sourced from the open seas.",
                    SKU = "60ddf30e02d3a810c7f04767",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[6],
                    Title = "Jumbo Shrimp",
                    Price = 10.99M,
                    Description = "Large and succulent shrimp, perfect for grilling or adding to seafood dishes.",
                    SKU = "60ddf30e02d3a810c7f04768",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[7],
                    Title = "Organic Whole Milk",
                    Price = 3.49M,
                    Description = "Creamy and nutritious whole milk from organically raised cows.",
                    SKU = "60ddf30e02d3a810c7f04733",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[8],
                    Title = "Farm-Fresh Organic Eggs",
                    Price = 2.99M,
                    Description = "Locally sourced organic eggs from free-range chickens.",
                    SKU = "60ddf30e02d3a810c7f04769",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[9],
                    Title = "Assorted Healthy Snack Pack",
                    Price = 7.99M,
                    Description = "A variety pack of nutritious and delicious snacks for on-the-go munching.",
                    SKU = "60ddf30e02d3a810c7f04770",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[10],
                    Title = "Assorted Gourmet Chocolate Box",
                    Price = 14.99M,
                    Description = "Indulge in a collection of handcrafted gourmet chocolates with various flavors.",
                    SKU = "60ddf30e02d3a810c7f04771",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[11],
                    Title = "Refreshing Soft Drink",
                    Price = 1.99M,
                    Description = "A refreshing soft drink to quench your thirst.",
                    SKU = "60ddf30e02d3a810c7f04774",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                },
                new Product {
                    Id = guids[12],
                    Title = "Premium Red Wine",
                    Price = 29.99M,
                    Description = "Indulge in the rich flavors of our premium red wine made from carefully selected grapes.",
                    SKU = "60ddf30e02d3a810c7f04773",
                    Type = Product.ProductTypes.Simple,
                    Visibility = Product.ProductVisibilities.PLP,
                    Active = true
                }
            };

            builder.Entity<Product>().HasData(products);

            var categories = new List<CategoryProduct> {
                new CategoryProduct {
                    CategoryId = 1,
                    ProductId = products[0].Id
                },
                new CategoryProduct {
                    CategoryId = 2,
                    ProductId = products[1].Id
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
                    ProductId = products[4].Id
                },
                new CategoryProduct {
                    CategoryId = 6,
                    ProductId = products[5].Id
                },
                new CategoryProduct {
                    CategoryId = 7,
                    ProductId = products[6].Id
                },
                new CategoryProduct {
                    CategoryId = 8,
                    ProductId = products[7].Id
                },
                new CategoryProduct {
                    CategoryId = 9,
                    ProductId = products[8].Id
                },
                new CategoryProduct {
                    CategoryId = 10,
                    ProductId = products[9].Id
                },
                new CategoryProduct {
                    CategoryId = 11,
                    ProductId = products[10].Id
                },
                new CategoryProduct {
                    CategoryId = 12,
                    ProductId = products[11].Id
                },
                new CategoryProduct {
                    CategoryId = 13,
                    ProductId = products[12].Id
                }
            };

            builder.Entity<CategoryProduct>().HasData(categories);

            var images = new List<ProductImage> {
                new ProductImage {
                    Id = 1,
                    URL = "https://img.freepik.com/free-photo/fresh-broccoli-vegetable_144627-20155.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[0],
                    Primary = true
                },
                new ProductImage {
                    Id = 2,
                    URL = "https://img.freepik.com/premium-photo/watermelon-half_917664-5054.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[1],
                    Primary = true
                },
                new ProductImage {
                    Id = 3,
                    URL = "https://img.freepik.com/free-photo/raw-chicken-fillet-legs-wooden-plate-with-fresh-vegetables_114579-22510.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[2],
                    Primary = true
                },
                new ProductImage {
                    Id = 4,
                    URL = "https://img.freepik.com/free-photo/overhead-view-green-fresh-red-raw-meat-cutting-board-pepper-lemon-wooden-hammer-flower-right-side-green-black-mix-color-background_179666-47460.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[3],
                    Primary = true
                },
                new ProductImage {
                    Id = 5,
                    URL = "https://img.freepik.com/free-photo/top-view-fresh-raw-meat-wooden-board-black-wooden-background-gourmet-food-fresh-uncooked-meal_482257-36625.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[4],
                    Primary = true
                },
                new ProductImage {
                    Id = 6,
                    URL = "https://img.freepik.com/free-photo/top-view-salmon-white-plate_23-2148754852.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[5],
                    Primary = true
                },
                new ProductImage {
                    Id = 7,
                    URL = "https://img.freepik.com/free-photo/black-stone-shrimp_1205-735.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[6],
                    Primary = true
                },
                new ProductImage {
                    Id = 8,
                    URL = "https://img.freepik.com/free-photo/milk-glass-jug-wooden-table_1150-17621.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[7],
                    Primary = true
                },
                new ProductImage {
                    Id = 9,
                    URL = "https://img.freepik.com/free-photo/eggs-cups-burlap-with-dry-grass_1150-25512.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[8],
                    Primary = true
                },
                new ProductImage {
                    Id = 10,
                    URL = "https://img.freepik.com/free-photo/view-snack-bars-with-fruits_23-2148582646.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[9],
                    Primary = true
                },
                new ProductImage {
                    Id = 11,
                    URL = "https://img.freepik.com/free-photo/still-life-delicious-marzipan-dessert_23-2149715503.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[10],
                    Primary = true
                },
                new ProductImage {
                    Id = 12,
                    URL = "https://img.freepik.com/free-photo/fresh-cola-drink-glass_144627-16201.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=ais",
                    ProductId = guids[11],
                    Primary = true
                },
                new ProductImage {
                    Id = 13,
                    URL = "https://img.freepik.com/premium-psd/realistic-wine-bottle-label-mock-up_69509-232.jpg?size=626&ext=jpg&ga=GA1.1.1462001494.1681889636&semt=sph",
                    ProductId = guids[12],
                    Primary = true
                }
            };

            builder.Entity<ProductImage>().HasData(images);
        }

        private static Guid[] GenerateGuids(int count)
        {
            Guid[] guids = new Guid[count];

            for (int i = 0; i < count; i++)
                guids[i] = Guid.NewGuid();

            return guids;
        }
    }
}
