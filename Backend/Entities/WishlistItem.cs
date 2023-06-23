using System;

namespace Virta.Entities
{
    public class WishlistItem
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid WishlistUserId { get; set; } // Wishlist Id is the same as the User Id
        public virtual Product Product { get; set; }
        public virtual Wishlist Wishlist { get; set; }
    }
}
