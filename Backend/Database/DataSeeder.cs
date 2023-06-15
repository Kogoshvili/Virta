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
    }
}
