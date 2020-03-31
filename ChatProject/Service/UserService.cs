using ChatProject.Dto;
using EF;
using EntityFramework;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ChatProject.Service
{
    public class UserService : IUserServices
    {
        private readonly ChatProjectDBContext _context;

        public UserService( ChatProjectDBContext context )
        {
            _context = context;
        }

        public List<UserDto> GetUsers()
        {
            List<User> users = _context.Users.ToList();

            return users.ConvertAll( Convert );
        }

        public bool AddUser( UserDto user )
        {
            User oldUser = _context.Users.Where( item => item.Login == user.Login ).FirstOrDefault();
            if ( oldUser == null )
            {
                _context.Users.Add( new User
                {
                    Name = user.Name,
                    Login = user.Login,
                    Password = user.Password,
                    Type = UserType.User
                } );

                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public UserDto GetUser(  int id )
        {
            return Convert( _context.Users.Where( item => item.Id == id ).FirstOrDefault() ); 
        }

        public UserDto GetUserByLogin( string login )
        {
            return Convert( _context.Users.Where( item => item.Login == login ).FirstOrDefault() );
        }

        public List<UserDto> GetFriends( string login )
        {
            User user = _context.Users.Where( item => item.Login == login ).FirstOrDefault();
            List<int> friendsId = _context.UserFriends.Where( friend => friend.UserId == user.Id ).Select( friend => friend.FriendId ).ToList();
            List<User> friends = _context.Users.Where( item => friendsId.Contains( item.Id ) ).ToList();

            return friends.ConvertAll( Convert );
        }

        public List<MessageDto> GetMessagesByDates( string login, DateTime start, DateTime end )
        {
            var userId = GetUserByLogin( login ).Id;

            var messageQry =
                from userMes in _context.UserMessages
                join message in _context.Messages on userMes.MessageId equals message.Id
                join messageChat in _context.ChatMessages on message.Id equals messageChat.MessageId
                where message.Date >= start && message.Date <= end
                select new MessageDto
                {
                    UserLogin = login,
                    ChatId = messageChat.ChatId,
                    Text = message.Text,
                    Date = message.Date
                };

            return messageQry.ToList();
        }

        private UserDto Convert( User user )
        {
            if ( user != null )
            {
                return new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Login = user.Login,
                    Password = user.Password,
                    Type = user.Type
                };
            }
            else
            {
                return new UserDto();
            }
        }
    }
}
