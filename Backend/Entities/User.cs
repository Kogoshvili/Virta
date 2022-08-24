using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Virta.Entities
{
    public class User : IdentityUser<Guid>
    {
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual Wishlist Wishlist { get; set; }
    }
}
