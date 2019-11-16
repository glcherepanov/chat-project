using ChatProject.Dto;
using Microsoft.AspNetCore.Mvc;

namespace ChatProject.Controllers
{
    [Route( "api/[controller]" )]
    public class UserController : Controller
    {
        [HttpGet( "user" )]
        public UserDto GetUser( int id )
        {
            return new UserDto
            {
                Name = "user",
                Login = "login",
                Type = EntityFramework.Entities.UserType.User
            };
        }
    }
}
