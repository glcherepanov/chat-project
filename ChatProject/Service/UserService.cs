using ChatProject.Dto;
using EF;
using EntityFramework;
using EntityFramework.Entities;
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

        public void AddUser( User user )
        {
            _context.Users.Add( user );
        }

        private UserDto Convert( User user )
        {
            return new UserDto
            {
                Name = user.Name,
                Login = user.Login,
                Type = user.Type
            };
        }
    }
}
