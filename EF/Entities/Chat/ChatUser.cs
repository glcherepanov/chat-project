﻿namespace EntityFramework.Entities
{
    public class ChatUser : IEntity
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public int UserId { get; set; }
    }
}
