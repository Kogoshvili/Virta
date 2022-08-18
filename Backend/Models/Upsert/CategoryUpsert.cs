using System.Collections.Generic;

namespace Virta.Models
{
    public class CategoryUpsert
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public bool Visible { get; set; }
        public int Priority { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public string BannerLarge { get; set; }
        public string BannerSmall { get; set; }
        public int Parent { get; set; }
    }
}
