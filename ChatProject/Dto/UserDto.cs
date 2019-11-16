using EntityFramework.Entities;

namespace ChatProject.Dto
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public UserType Type { get; set; }
    }
}
