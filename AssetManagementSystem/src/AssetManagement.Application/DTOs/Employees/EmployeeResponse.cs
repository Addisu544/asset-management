namespace AssetManagement.Application.DTOs.Employees;

public class EmployeeResponse
{
    public int Id { get; set; }
    public string UserId { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Role { get; set; } = default!;
    public string Status { get; set; } = default!;
}