using Microsoft.EntityFrameworkCore;
using Virta.Entities;

namespace Virta.Database
{
    public static class DataConfigurator
    {
        public static void Configure(ModelBuilder builder)
        {
            UserConfigurator(builder);
            CategoryConfigurator(builder);
            ProductConfigurator(builder);
            AttributesConfigurator(builder);
            OrderConfigurator(builder);
            ReviewConfigurator(builder);
        }

        private static void UserConfigurator(ModelBuilder builder)
        {
            #region User
            builder.Entity<User>()
                .HasMany(u => u.Addresses)
                .WithOne(a => a.User)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<User>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.SetNull);
            #endregion

            #region Addresses
            builder.Entity<Address>()
                .Property(a => a.Country)
                .HasDefaultValue("Georgia");

            builder.Entity<Address>()
                .Property(a => a.Primary)
                .HasDefaultValue(false);

            builder.Entity<Address>()
                .Property(a => a.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Entity<Address>()
                .Property(a => a.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();
            #endregion
        }

        private static void CategoryConfigurator(ModelBuilder builder)
        {
            #region Category
            builder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();

            builder.Entity<Category>()
                .HasIndex(c => c.Title)
                .IsUnique();

            builder.Entity<Category>()
                .Property(c => c.Visible)
                .HasDefaultValue(false);

            builder.Entity<Category>()
                .Property(c => c.Priority)
                .HasDefaultValue(0);

            builder.Entity<Category>()
                .HasMany(c => c.Children)
                .WithOne(c => c.Parent)
                .OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Category>()
                .Property(c => c.Icon)
                .HasColumnType("varchar(100)");
            #endregion

            #region CategoryProduct
            builder.Entity<CategoryProduct>()
                .HasKey(cp => new { cp.CategoryId, cp.ProductId });

            builder.Entity<CategoryProduct>()
                .HasOne(cp => cp.Category)
                .WithMany(p => p.CategoryProducts)
                .HasForeignKey(cp => cp.CategoryId);

            builder.Entity<CategoryProduct>()
                .HasOne(cp => cp.Product)
                .WithMany(p => p.CategoryProducts)
                .HasForeignKey(cp => cp.ProductId);
            #endregion
        }

        private static void ProductConfigurator(ModelBuilder builder)
        {
            #region Product
            builder.Entity<Product>()
                .HasIndex(p => p.SKU)
                .IsUnique();

            builder.Entity<Product>()
                .Property(p => p.Price)
                .HasDefaultValue(0);

            builder.Entity<Product>()
                .Property(p => p.OldPrice)
                .HasDefaultValue(null);

            builder.Entity<Product>()
                .Property(p => p.Type)
                .HasDefaultValue(Product.ProductTypes.Simple);

            builder.Entity<Product>()
                .Property(p => p.Visibility)
                .HasDefaultValue(Product.ProductVisibilities.Invisible);

            builder.Entity<Product>()
                .Property(p => p.Active)
                .HasDefaultValue(false);

            builder.Entity<Product>()
                .HasMany(p => p.ProductAttributes)
                .WithOne(p => p.Product)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>()
                .HasMany(p => p.Images)
                .WithOne(p => p.Product)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Entity<Product>()
                .Property(p => p.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();

            builder.Entity<Product>()
                .Property(p => p.Description)
                .HasColumnType("text");

            builder.Entity<Product>()
                .Property(p => p.Label)
                .HasDefaultValue(Product.ProductLabels.None);
            #endregion

            #region Product Attributes
            builder.Entity<ProductAttribute>()
                .Property(pa => pa.Priority)
                .HasDefaultValue(0);

            builder.Entity<ProductAttribute>()
                .Property(o => o.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();
            #endregion

            #region Product Images
            builder.Entity<ProductImage>()
                .Property(pi => pi.Primary)
                .HasDefaultValue(false);

            builder.Entity<ProductImage>()
                .Property(o => o.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();

            builder.Entity<ProductImage>()
                .HasOne(pi => pi.Product)
                .WithMany(p => p.Images)
                .HasForeignKey(pi => pi.ProductId);
            #endregion
        }

        private static void AttributesConfigurator(ModelBuilder builder)
        {
            #region Attribute
            builder.Entity<Attribute>()
                .HasIndex(a => a.Name)
                .IsUnique();

            builder.Entity<Attribute>()
                .HasIndex(a => a.Title)
                .IsUnique();

            builder.Entity<Attribute>()
                .HasMany(a => a.ProductAttributes)
                .WithOne(a => a.Attribute)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Attribute>()
                .Property(a => a.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Entity<Attribute>()
                .Property(a => a.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();
            #endregion
        }

        private static void OrderConfigurator(ModelBuilder builder)
        {
            #region Order
            builder.Entity<Order>()
                .Property(o => o.ShippingCost)
                .HasColumnType("numeric(8,2)")
                .HasDefaultValue(0);

            builder.Entity<Order>()
                .Property(o => o.Status)
                .HasDefaultValue("Pending");

            builder.Entity<Order>()
                .Property(o => o.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Entity<Order>()
                .Property(o => o.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();
            #endregion

            #region Order Product
            builder.Entity<OrderProduct>()
                .HasKey(op =>
                    new { op.OrderId, op.ProductId }
                );

            builder.Entity<OrderProduct>()
                .Property(op => op.Price)
                .HasColumnType("numeric(9,2)")
                .HasDefaultValue(0);

            builder.Entity<OrderProduct>()
                .Property(op => op.Quantity)
                .HasDefaultValue(0);
            #endregion
        }

        private static void ReviewConfigurator(ModelBuilder builder)
        {
            #region Review
            builder.Entity<Review>()
                .Property(r => r.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Entity<Review>()
                .Property(r => r.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired()
                .IsConcurrencyToken();
            #endregion
        }
    }
}
