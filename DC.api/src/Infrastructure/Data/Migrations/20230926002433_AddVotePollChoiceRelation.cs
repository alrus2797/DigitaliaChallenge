using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC.api.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddVotePollChoiceRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Choice",
                table: "Votes");

            migrationBuilder.AddColumn<int>(
                name: "ChoiceId",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ChoiceId",
                table: "Votes",
                column: "ChoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_PollChoices_ChoiceId",
                table: "Votes",
                column: "ChoiceId",
                principalTable: "PollChoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_PollChoices_ChoiceId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_ChoiceId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "ChoiceId",
                table: "Votes");

            migrationBuilder.AddColumn<string>(
                name: "Choice",
                table: "Votes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
