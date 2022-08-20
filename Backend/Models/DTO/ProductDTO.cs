using System;
using System.Collections.Generic;
using static Virta.Entities.Product;

namespace Virta.Api.DTO
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string SKU { get; set; }
        public virtual List<ProductAttributeDTO> Attributes { get; set; }
        public virtual List<ProductImageDTO> Images { get; set; }
        public List<Guid> AssociatedProducts { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public ProductTypes Type { get; set; }
        public ProductVisibilities Visibility { get; set; }
        public bool Active { get; set; }
        public virtual ICollection<CategoryDTO> Categories { get; set; }
        public int Stars { get; set; }
        public int Reviews { get; set; }
        public string Unit { get; set; }
        public decimal? OldPrice { get; set; }
        public ProductLabels? Label { get; set; }
        public string Video { get; set; }
    }
}
