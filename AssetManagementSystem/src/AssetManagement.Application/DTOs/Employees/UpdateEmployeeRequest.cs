namespace AssetManagement.Application.DTOs.Employees;

public class UpdateEmployeeRequest
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public int DepartmentId { get; set; }
    public string Title { get; set; } = default!;
    public string Level { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string Role { get; set; } = default!;
    public string Status { get; set; } = default!; // Active / Inactive
}