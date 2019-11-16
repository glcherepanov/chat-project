namespace EntityFramework.Entities
{
    public class UserMessage : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MessageId { get; set; }
    }
}
