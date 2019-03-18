using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactLabRemake.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CorrectAnswer", "Question", "Score", "WrongAnswer1", "WrongAnswer2", "WrongAnswer3" },
                values: new object[,]
                {
                    { 1, "x=2", "5x=10", 3, "x=3", "x=4", "x=1" },
                    { 2, "x=3", "x^3=81", 5, "x=2", "x=1", "x=4" },
                    { 3, "x=5", "x^2+6x-30=25", 7, "x=3", "x=10", "x=7" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Highscore", "Name", "Password" },
                values: new object[,]
                {
                    { 1, 0, "Admin", "password" },
                    { 2, 10, "Samuel", "qwert1234" }
                });

            migrationBuilder.InsertData(
                table: "Highscores",
                columns: new[] { "Id", "Score", "Time", "UserId" },
                values: new object[] { 1, 10, new DateTime(2019, 3, 11, 21, 22, 53, 702, DateTimeKind.Local), 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Highscores",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
