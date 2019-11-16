using EntityFramework.Entities;
using Microsoft.EntityFrameworkCore;

namespace EF
{
    public class ChatProjectDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserFriend> UserFriends { get; set; }
        public DbSet<UserMessage> UserMessages { get; set; }
        DbSet<Chat> Chats { get; set; }
        DbSet<ChatUser> ChatUsers { get; set; }
        DbSet<ChatMessage> ChatMessages { get; set; }
        DbSet<Image> Images { get; set; }
        DbSet<Message> Messages { get; set; }

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
