using ChatProject.Dto;
using EF;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public class ChatService : IChatService
    {
        private readonly ChatProjectDBContext _context;

        public ChatService( ChatProjectDBContext context )
        {
            _context = context;

        }

        public List<ChatDto> GetChatsByLogin( string login )
        {
            User user = _context.Users.Where( item => item.Login == login ).FirstOrDefault();
            List<int> userChats = _context.ChatUsers.Where( chatUser => chatUser.UserId == user.Id ).Select( chatUser => chatUser.ChatId ).ToList();
            List<Chat> chats = _context.Chats.Where( chat => userChats.Contains( chat.Id ) ).ToList();

            return chats.ConvertAll( Convert );
        }

        private ChatDto Convert( Chat chat )
        {
            return new ChatDto
            {
                Id = chat.Id,
                Type = chat.Type,
                Image = chat.ImageId.ToString(),
                Name = chat.Name
            };
        }
    }
}
