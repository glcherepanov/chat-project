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

        public bool RemoveChat( int id )
        {
            try
            {
                var users = _context.ChatUsers.Where( c => c.ChatId == id ).ToList();
                _context.ChatUsers.RemoveRange( users );

                var chat = _context.Chats.FirstOrDefault( c => c.Id == id );
                var image = _context.Images.FirstOrDefault( i => i.Id == chat.ImageId );
                _context.Chats.Remove( chat );
                _context.Images.Remove( image );

                return true;
            }
            catch ( Exception )
            {
                return false;
            }
        }

        public bool AddChat( ChatDto chat )
        {
            try
            {
                _context.Chats.Add( new Chat
                {
                    Type = chat.Type,
                    Name = chat.Name,
                } );
                _context.SaveChanges();

                return true;
            }
            catch ( Exception )
            {
                return false;
            }
        }

        public bool AddUserToChat( int id, string login )
        {
            try
            {
                var userId = GetUserIdByLogin( login );

                _context.ChatUsers.Add( new ChatUser
                {
                    ChatId = id,
                    UserId = userId
                } );
                _context.SaveChanges();

                return true;
            }
            catch ( Exception )
            {
                return false;
            }
        }

        public ChatDto GetChatById( int id )
        {
            var chatQry =
                from chat in _context.Chats
                join image in _context.Images on chat.ImageId equals image.Id
                where chat.Id == id
                select new ChatDto
                {
                    Id = chat.Id,
                    Type = chat.Type,
                    Image = image.Path,
                    Name = chat.Name
                };

            return chatQry.FirstOrDefault();
        }

        public List<ChatDto> GetChatsByLogin( string login )
        {
            var chats =
                from user in _context.Users
                join userChat in _context.ChatUsers on user.Id equals userChat.UserId
                join chat in _context.Chats on userChat.ChatId equals chat.Id
                join image in _context.Images on chat.ImageId equals image.Id
                where user.Login == login
                select new ChatDto
                {
                    Id = chat.Id,
                    Type = chat.Type,
                    Image = image.Path,
                    Name = chat.Name
                };


            return chats.ToList();
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
                _context.SaveChanges();

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

        public bool ChangeChatImage( int id, string path )
        {
            try
            {
                var imageQry =
                    from chat in _context.Chats
                    join image in _context.Images on chat.ImageId equals image.Id
                    where chat.Id == id
                    select image;

                var imageData = imageQry.FirstOrDefault();
                imageData.Path = path;

                _context.Images.Update( imageData );
                _context.SaveChanges();

                return true;
            }
            catch ( Exception )
            {
                return false;
            }
        }

        private int GetUserIdByLogin( string login )
        {
            return ( int ) _context.Users.FirstOrDefault( user => user.Login == login )?.Id;
        }
    }
}
