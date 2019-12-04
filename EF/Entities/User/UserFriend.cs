namespace EntityFramework.Entities
{
    public class UserFriend : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FriendId { get; set; }
    }
}
