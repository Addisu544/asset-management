using AssetManagement.Domain.Enums;

namespace AssetManagement.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string TagNo { get; set; } = null!;

        public int AssetGroupId { get; set; }
        public AssetGroup AssetGroup { get; set; } = null!;

        public int AssetTypeId { get; set; }
        public AssetType AssetType { get; set; } = null!;

        public DateTime StockedAt { get; set; }

        public string? ImagePath { get; set; }

        public ProductStatus Status { get; set; } = ProductStatus.Free;

        public string Brand { get; set; } = null!;
        public decimal Cost { get; set; }
        public string SerialNo { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<AssetTransaction> Transactions { get; set; } = new List<AssetTransaction>();
    }
}