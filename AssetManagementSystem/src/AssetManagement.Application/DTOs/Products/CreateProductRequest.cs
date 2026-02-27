public class CreateProductRequest
{
    public string TagNo { get; set; } = null!;
    public int AssetGroupId { get; set; }
    public int AssetTypeId { get; set; }
    public DateTime StockedAt { get; set; }
    public string? ImagePath { get; set; }
    public string Brand { get; set; } = null!;
    public decimal Cost { get; set; }
    public string SerialNo { get; set; } = null!;
}