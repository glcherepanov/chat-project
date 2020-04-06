using ChatProject.Dto;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public interface IUserServices
    {
        List<UserDto> GetUsers();
        bool AddUser( UserDto user );
        UserDto GetUser( int id );
        List<UserDto> GetUsersByLogin( string login );
        UserDto GetUserByLogin( string login );
        bool IsFriend( string login, string friend );
        bool AddFriend( string login, string friend );
        bool RemoveFriend( string login, string friend );
        List<UserDto> GetFriends( string login );
        List<MessageDto> GetMessagesByDates( string login, DateTime start, DateTime end );
        bool ChangeName( string login, string name );
        bool ChangePassword( string login, string password );
    }
}
