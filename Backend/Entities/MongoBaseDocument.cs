using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Virta.Entities
{
    public abstract class MongoBaseDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid UserId { get; set; }
    }
}
