using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Virta.Entities
{
    public class Cart
    {
        [Key]
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<CartItem> Products { get; set; }

        public class CartItem
        {
            public int Id { get; set; }
            public virtual Product Product { get; set; }
            public int Quantity { get; set; }
        }
    }
}
