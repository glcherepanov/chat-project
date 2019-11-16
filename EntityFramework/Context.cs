using EntityFramework.Entities;
using System.Data.Entity;

namespace EntityFramework
{
    public class ChatProjectContext : DbContext
    {
        public ChatProjectContext()
            : base( "DbConnection" )
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserFriend> UserFriends { get; set; }
        public DbSet<UserMessage> UserMessages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatUser> ChatUsers { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Message> Messages { get; set; }

    }
}
