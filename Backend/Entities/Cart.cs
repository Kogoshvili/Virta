using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Virta.Entities
{
    public class Cart
    {
        [Key]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}
