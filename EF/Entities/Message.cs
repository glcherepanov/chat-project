using System;

namespace EntityFramework.Entities
{
    public class Message : IEntity
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
    }
}
