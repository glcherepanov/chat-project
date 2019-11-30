using EntityFramework.Entities;

namespace ChatProject.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public UserType Type { get; set; }
    }
}
