using System;
using System.Collections.Generic;

namespace Virta.Api.DTO
{
    public class WishlistDTOIn
    {
        public ICollection<Guid> ProductIds { get; set; }
    }
}
