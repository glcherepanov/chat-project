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

        public List<UserDto> GetUsersByLogin( string login )
        {
            return _context.Users.Where( user => user.Login.Contains( login ) ).ToList().ConvertAll( Convert );
        }

        public bool IsFriend( string login, string friend )
        {
            int userId = (int) GetUserByLogin( login )?.Id;
            int friendId = ( int ) GetUserByLogin( friend )?.Id;

            return _context.UserFriends.Any( userFriend => userFriend.UserId == userId && userFriend.FriendId == friendId )
                ? true
                : false;
        }

        public bool AddFriend( string login, string friend )
        {
            int? userId = GetUserByLogin( login )?.Id;
            int? friendId = GetUserByLogin( friend )?.Id;

            if ( userId != null && friendId != null )
            {
                _context.UserFriends.Add( new UserFriend
                {
                    UserId = ( int ) userId,
                    FriendId = ( int ) friendId
                } );
                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public bool RemoveFriend( string login, string friend )
        {
            int? userId = GetUserByLogin( login )?.Id;
            int? friendId = GetUserByLogin( friend )?.Id;

            if ( userId != null && friendId != null )
            {
                UserFriend userFriend = _context.UserFriends.FirstOrDefault( uf => uf.UserId == userId && uf.FriendId == friendId );
                if ( userFriend != null )
                {
                    _context.Remove( userFriend );
                    _context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
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
            int userId = GetUserByLogin( login ).Id;

            IQueryable<MessageDto> messageQry =
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

        public bool ChangeName( string login, string name )
        {
            User user = _context.Users.FirstOrDefault( u => u.Login == login );

            if ( user != null )
            {
                user.Name = name;
                _context.Users.Update( user );
                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public bool ChangePassword( string login, string password )
        {
            User user = _context.Users.FirstOrDefault( u => u.Login == login );

            if ( user != null )
            {
                user.Password = password;
                _context.Users.Update( user );
                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
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
