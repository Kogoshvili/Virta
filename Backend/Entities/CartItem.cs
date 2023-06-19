using System;

namespace Virta.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid CartId { get; set; }
        public int Quantity { get; set; }
        public virtual Product Product { get; set; }
        public virtual Cart Cart { get; set; }
    }
}
