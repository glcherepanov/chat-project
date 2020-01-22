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

        public List<MessageDto> GetChatMessages( int id )
        {
            List<int> messegesIds = _context.ChatMessages.Where( item => item.ChatId == id ).Select( item => item.MessageId ).ToList();
            Dictionary<int, List<int>> usersMesseges = _context.UserMessages
                .Where( item => messegesIds.Contains( item.MessageId ) )
                .GroupBy( item => item.UserId )
                .ToDictionary( item => item.Key, item => item.Select( i => i.MessageId ).ToList() );

            var messeges =
                from chatMessage in _context.ChatMessages
                join message in _context.Messages on chatMessage.MessageId equals message.Id
                join userMessage in _context.UserMessages on message.Id equals userMessage.MessageId
                join user in _context.Users on userMessage.UserId equals user.Id
                where chatMessage.ChatId == id
                select new MessageDto
                {
                    ChatId = chatMessage.ChatId,
                    UserLogin = user.Login,
                    Date = message.Date,
                    Text = message.Text
                };


            return messeges.ToList();
        }

        public bool SaveMessage( MessageDto message )
        {
            try
            {
                _context.Messages.Add( new Message
                {
                    Date = DateTime.Now,
                    Text = message.Text
                });
                var newMessage = _context.Messages.LastOrDefault(); 
                _context.ChatMessages.Add( new ChatMessage
                {
                    MessageId = newMessage.Id,
                    ChatId = message.ChatId
                } );
                _context.UserMessages.Add( new UserMessage
                {
                    UserId = GetUserIdByLogin( message.UserLogin ),
                    MessageId = newMessage.Id
                } );

                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
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

        private int GetUserIdByLogin( string login )
        {
            return ( int ) _context.Users.FirstOrDefault( user => user.Login == login )?.Id;
        }
    }
}
