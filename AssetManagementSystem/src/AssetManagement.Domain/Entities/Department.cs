namespace AssetManagement.Domain.Entities
{
    public class Department
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; } = null!;

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}