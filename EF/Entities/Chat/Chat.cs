namespace EntityFramework.Entities
{
    public class Chat : IEntity
    {
        public int Id { get; set; }
        public ChatType Type { get; set; }
        public int ImageId { get; set; }
        public string Name { get; set; }
    }
}
