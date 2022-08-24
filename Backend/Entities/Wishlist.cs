using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Virta.Entities
{
    public class Wishlist
    {
        [Key]
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<WishlistItem> Products { get; set; }

        public class WishlistItem
        {
            public int Id { get; set; }
            public virtual Product Product { get; set; }
        }
    }
}
