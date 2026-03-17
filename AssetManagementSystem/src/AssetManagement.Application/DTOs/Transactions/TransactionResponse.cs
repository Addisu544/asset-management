public class TransactionResponse
{
    public int Id { get; set; }
    public string TransactionType { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    public string EmployeeName { get; set; } = null!;
    public string EmployeeUserId { get; set; } = null!;

    public string ProductTagNo { get; set; } = null!;
    public string ProductBrand { get; set; } = null!;
    public string GroupName { get; set; } = null!;
    public string TypeName { get; set; } = null!;

    public string IssuedBy { get; set; }
}