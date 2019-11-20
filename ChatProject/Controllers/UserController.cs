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

        [HttpGet( "users" )]
        public List<UserDto> GetUser( int id )
        {
            return _service.GetUsers();
        }

        [HttpGet( "add-user" )]
        public void AddUser()
        {
            _service.AddUser( new User() );
        }

        [HttpPost( "login" )]
        public bool CheckUserLoginPassword( UserDto user )
        {
            UserDto userIdBase = _service.GetUser( user.Id );

            if ( user.Login == userIdBase.Login && user.Password == userIdBase.Password )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
