using System;
using System.Collections.Generic;

namespace Virta.Models
{
    public class CartUpsert
    {
        public Guid UserId { get; set; }
        public IEnumerable<CartItemUpsert> Products { get; set; }

        public class CartItemUpsert
        {
            public int Id { get; set; }
            public int Quantity { get; set; }
            public Guid ProductId { get; set; }
        }
    }
}
