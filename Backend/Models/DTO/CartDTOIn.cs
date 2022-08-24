
using System.Collections.Generic;

namespace Virta.Api.DTO
{
    public class CartDTOIn
    {
        public IEnumerable<CartItemDTOIn> Products { get; set; }

        public class CartItemDTOIn
        {
            public int Quantity { get; set; }
            public string ProductId { get; set; }
        }
    }
}
