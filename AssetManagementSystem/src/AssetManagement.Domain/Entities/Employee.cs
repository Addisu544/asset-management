using AssetManagement.Domain.Enums;

namespace AssetManagement.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!; // Business ID

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public int DepartmentId { get; set; }
        public Department Department { get; set; } = null!;

        public string Title { get; set; } = null!;
        public Level Level { get; set; }

        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public Role Role { get; set; }
        public EmployeeStatus Status { get; set; } = EmployeeStatus.Active;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<AssetTransaction> Transactions { get; set; } = new List<AssetTransaction>();
    }
}