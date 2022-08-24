using System.Collections.Generic;
using System;
using Virta.Entities;

namespace Virta.Api.DTO
{
    public class CartDTO
    {
        public IEnumerable<CartItemDTO> Products { get; set; }

        public class CartItemDTO
        {
            public Guid ProductId { get; set; }
            public int Quantity { get; set; }
            public string Title { get; set; }
            public decimal Price { get; set; }
            public Product.ProductLabels Unit { get; set; }
            public string ImageUrl { get; set; }
        }
    }
}

