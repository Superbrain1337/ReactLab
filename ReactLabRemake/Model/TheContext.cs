using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactLabRemake.Model
{
    public class TheContext : DbContext
    {
        public TheContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<QuestionClass> Questions { get; set; }

        public DbSet<UserClass> Users { get; set; }

        public DbSet<Highscore> Highscores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=NewQuizzGameDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestionClass>().HasData(
                new QuestionClass { Id = 1, Score = 3, Question = "5x=10", CorrectAnswer = "x=2", WrongAnswer1 = "x=3", WrongAnswer2 = "x=4", WrongAnswer3 = "x=1" },
                new QuestionClass { Id = 2, Score = 5, Question = "x^3=27", CorrectAnswer = "x=3", WrongAnswer1 = "x=2", WrongAnswer2 = "x=1", WrongAnswer3 = "x=4" },
                new QuestionClass { Id = 3, Score = 7, Question = "x^2+6x-30=25", CorrectAnswer = "x=5", WrongAnswer1 = "x=3", WrongAnswer2 = "x=10", WrongAnswer3 = "x=7" }
                );

            modelBuilder.Entity<UserClass>().HasData(
                new UserClass { Id = 1, Highscore = 0, Name = "Admin", Password = "password" },
                new UserClass { Id = 2, Highscore = 10, Name = "Samuel", Password = "qwert1234" }
                );

            modelBuilder.Entity<Highscore>().HasData(
                new Highscore { Id = 1, Score = 10, Time = DateTime.Now, UserId = 2 }
                );
        }
    }
}
