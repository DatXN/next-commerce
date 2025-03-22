using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class OrderItemDecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add new numeric column
            migrationBuilder.AddColumn<decimal>(
                name: "PriceNumeric",
                table: "OrderItems",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            // Update the new column with converted values
            migrationBuilder.Sql(@"
                UPDATE ""OrderItems""
                SET ""PriceNumeric"" = CAST(REPLACE(REPLACE(""Price"", '$', ''), ',', '') AS numeric)
                WHERE ""Price"" ~ '^[0-9$.,]+$'");

            // Drop the old text column
            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderItems");

            // Rename the new column to Price
            migrationBuilder.RenameColumn(
                name: "PriceNumeric",
                table: "OrderItems",
                newName: "Price");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Add back the text column
            migrationBuilder.AddColumn<string>(
                name: "Price",
                table: "OrderItems",
                type: "text",
                nullable: false,
                defaultValue: "0");

            // Convert numeric values back to text
            migrationBuilder.Sql(@"
                UPDATE ""OrderItems""
                SET ""Price"" = CAST(""PriceNumeric"" AS text)");

            // Drop the numeric column
            migrationBuilder.DropColumn(
                name: "PriceNumeric",
                table: "OrderItems");
        }
    }
}
