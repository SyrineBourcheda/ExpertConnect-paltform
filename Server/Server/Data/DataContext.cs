/*using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<Session> Sessions { get; set; }
    }
}
*/



using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public virtual DbSet<Session> Sessions { get; set; }
      

        public virtual DbSet<Reservation> Reservations { get; set; }
      


        public DbSet<ExpertUser> ExpertUsers { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<user> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ExpertUser>().ToTable("ExpertUsers");
            builder.Entity<user>().ToTable("Users");
            builder.Entity<Feedback>().ToTable("Feedbacks");


        }





    }
}