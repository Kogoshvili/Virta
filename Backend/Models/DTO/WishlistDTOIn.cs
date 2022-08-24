using System;
using System.Collections.Generic;

namespace Virta.Api.DTO
{
    public class WishlistDTOIn
    {
        public IEnumerable<Guid> ProductId { get; set; }
    }
}
