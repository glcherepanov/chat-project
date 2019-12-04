namespace EntityFramework.Entities
{
    public class ChatMessage : IEntity
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public int MessageId { get; set; }
    }
}
