using ChatProject.Dto;
using ChatProject.Service;
using EntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChatProject.Controllers
{
    [Route( "api/[controller]" )]
    public class UserController : Controller
    {
        private readonly IUserServices _service;

        public UserController( IUserServices service )
        {
            _service = service;
        }

        [HttpGet()]
        public UserDto GetUser( string login )
        {
            return _service.GetUserByLogin( login );
        }

        [HttpGet( "users" )]
        public List<UserDto> GetUser()
        {
            return _service.GetUsers();
        }

        [HttpGet( "friends" )]
        public List<UserDto> GetUserFriends( string login )
        {
            return _service.GetFriends( login );
        }

        [HttpPost( "add" )]
        public bool AddUser( [FromBody] UserDto user )
        {
           return _service.AddUser( user );
        }

        [HttpGet( "login" )]
        public bool CheckUserLoginPassword( string login, string password )
        {
            UserDto userIdBase = _service.GetUserByLogin( login );

            return password == userIdBase?.Password;
        }
    }
}
