using AssetManagement.Domain.Enums;

namespace AssetManagement.Domain.Entities
{
    public class AssetTransaction
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public TransactionType TransactionType { get; set; }

        public int IssuedBy { get; set; } // AssetManager Id

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}