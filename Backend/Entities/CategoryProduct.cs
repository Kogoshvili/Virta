using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Virta.Entities
{
    public class CategoryProduct
    {
        public int CategoryId { get; set; }
        public Guid ProductId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Product Product { get; set; }
    }
}
