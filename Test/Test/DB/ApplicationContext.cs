using Microsoft.EntityFrameworkCore;
using Test.Models;

namespace Test.Repositories
{
    public class ApplicationContext:DbContext
    {
        public DbSet<ContactModel> Users { get; set; } = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            string connectionString = "Server=(localdb)\\mssqllocaldb;Database=contactsDB;Trusted_Connection=True;TrustServerCertificate=True;";
            builder.UseSqlServer(connectionString);
        }
        public ApplicationContext()
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }
    }
}
