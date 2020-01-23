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
        UserDto GetUserByLogin( string login );
        List<UserDto> GetFriends( string login );
        List<MessageDto> GetMessagesByDates( string login, DateTime start, DateTime end );
    }
}
