using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class issuedbychnagedtoname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetTransactions_Employees_EmployeeId",
                table: "AssetTransactions");

            migrationBuilder.CreateIndex(
                name: "IX_AssetTransactions_IssuedBy",
                table: "AssetTransactions",
                column: "IssuedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_AssetTransactions_Employees_EmployeeId",
                table: "AssetTransactions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetTransactions_Employees_IssuedBy",
                table: "AssetTransactions",
                column: "IssuedBy",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetTransactions_Employees_EmployeeId",
                table: "AssetTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_AssetTransactions_Employees_IssuedBy",
                table: "AssetTransactions");

            migrationBuilder.DropIndex(
                name: "IX_AssetTransactions_IssuedBy",
                table: "AssetTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_AssetTransactions_Employees_EmployeeId",
                table: "AssetTransactions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
