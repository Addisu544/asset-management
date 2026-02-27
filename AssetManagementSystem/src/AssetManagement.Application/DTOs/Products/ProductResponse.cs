public class ProductResponse
{
    public int Id { get; set; }
    public string TagNo { get; set; } = null!;
    public string GroupName { get; set; } = null!;
    public string TypeName { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public decimal Cost { get; set; }
    public string SerialNo { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string? ImagePath { get; set; }
    public DateTime StockedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}