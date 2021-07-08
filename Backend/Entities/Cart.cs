using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Virta.Entities
{
    public class Cart : MongoBaseDocument
    {
        public IEnumerable<CartItem> Products { get; set; }

        public class CartItem
        {
            [BsonRepresentation(BsonType.String)]
            public Guid Id { get; set; }
            public int Quantity { get; set; }
        }
    }
}