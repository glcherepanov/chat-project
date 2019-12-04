using EntityFramework.Entities;

namespace ChatProject.Dto
{
    public class ChatDto
    {
        public int Id { get; set; }
        public ChatType Type { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
    }
}
