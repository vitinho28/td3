using Microsoft.EntityFrameworkCore;
using Trabalho_3_Bruno.Entities;

namespace Trabalho_3_Bruno.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions context) : base(context) { }
        public DbSet<User> Users { get; set; }
    }
}
