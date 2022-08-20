using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Virta.Entities
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string SKU { get; set; }
        [Required]
        public ProductTypes Type { get; set; }
        [Required]
        public ProductVisibilities Visibility { get; set; }
        [Required]
        public bool Active { get; set; }
        public virtual ICollection<Product> AssociatedProducts { get; set; }
        public virtual ICollection<ProductAttribute> ProductAttributes { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<ProductImage> Images { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public ProductUnits Unit { get; set; }
        public decimal? OldPrice { get; set; }
        public ProductLabels Label { get; set; }
        public string Video { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public enum ProductTypes
        {
            Simple, // AssociatedProducts => NULL
            Bundle, // AssociatedProducts => Bundled products
            Configurable  // AssociatedProducts => Product variations
        }

        public enum ProductVisibilities
        {
            Invisible, // Invisible
            PDP, // Only PDP
            PLP // PDP & PLP
        }

        public enum ProductLabels
        {
            None,
            New,
            Sale,
            Off,
            Featured,
            Trending
        }

        public enum ProductUnits
        {
            Piece,
            Gram,
            Liter,
            Meter,
            Kilogram,
            SquareMeter,
        }
    }
}
