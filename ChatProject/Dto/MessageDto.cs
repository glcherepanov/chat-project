using System;

namespace ChatProject.Dto
{
    public class MessageDto
    {
        public string UserLogin { get; set; }
        public int ChatId { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
    }
}
