using System;
using System.ComponentModel.DataAnnotations;

namespace Virta.Entities
{
    public class Review
    {
        [Key]
        public Guid Id { get; set; }
        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
        public string Body { get; set; }
        public decimal Rating { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
