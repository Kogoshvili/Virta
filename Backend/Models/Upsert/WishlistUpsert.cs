using System;
using System.Collections.Generic;

namespace Virta.Models
{
    public class WishlistUpsert
    {
        public Guid UserId { get; set; }
        public virtual IEnumerable<WishlistItemUpsert> Products { get; set; }

        public class WishlistItemUpsert
        {
            public int Id { get; set; }
            public Guid ProductId { get; set; }
        }
    }
}
