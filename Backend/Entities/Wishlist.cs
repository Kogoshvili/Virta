using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Virta.Entities
{
    public class Wishlist
    {
        [Key]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<WishlistItem> WishlistItems { get; set; }
    }
}
