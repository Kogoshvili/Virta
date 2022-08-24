using System;
using System.Collections.Generic;
using Virta.Entities;

namespace Virta.Api.DTO
{
    public class WishlistDTO
    {
        public IEnumerable<WishlistItemDTO> Products { get; set; }

        public class WishlistItemDTO
        {
            public Guid ProductId { get; set; }
            public string Title { get; set; }
            public decimal Price { get; set; }
            public Product.ProductLabels Unit { get; set; }
            public string ImageUrl { get; set; }
        }
    }
}
