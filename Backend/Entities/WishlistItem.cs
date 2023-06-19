using System;

namespace Virta.Entities
{
    public class WishlistItem
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public virtual Product Product { get; set; }
        public virtual Wishlist Wishlist { get; set; }
    }
}
