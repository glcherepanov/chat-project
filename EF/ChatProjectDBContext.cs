using EntityFramework.Entities;
using Microsoft.EntityFrameworkCore;

namespace EF
{
    public class ChatProjectDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserFriend> UserFriends { get; set; }
        public DbSet<UserMessage> UserMessages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatUser> ChatUsers { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Message> Messages { get; set; }

        public ChatProjectDBContext( DbContextOptions<ChatProjectDBContext> options )
        : base( options )
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            optionsBuilder.UseSqlServer( @"Server=(localdb)\mssqllocaldb;Database=ChatProject;Trusted_Connection=True;" );
        }
    }
}
