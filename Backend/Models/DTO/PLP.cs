using System;
using System.Collections.Generic;

namespace Virta.Api.DTO
{
    public class PLP
    {
        public List<ProductDTO> Products { get; set; }
        public int TotalCount { get; set; }
    }
}
