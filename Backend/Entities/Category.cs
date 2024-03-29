using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Virta.Entities
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public bool Visible { get; set; }
        public int Priority { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public string BannerLarge { get; set; }
        public string BannerSmall { get; set; }
        public virtual Category Parent { get; set; }
        [JsonIgnore]
        public virtual ICollection<Category> Children { get; set; }
        public virtual ICollection<CategoryProduct> CategoryProducts { get; set; }
    }
}
