using AssetManagement.Application.DTOs.Employees;
using AssetManagement.Application.Interfaces;
using AssetManagement.Domain.Entities;
using AssetManagement.Domain.Enums;
using AssetManagement.Infrastructure.Data;
//using AssetManagement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
namespace AssetManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // All endpoints require authentication
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IPasswordService _passwordService;

    public EmployeesController(
        AppDbContext context,
        IPasswordService passwordService)
    {
        _context = context;
        _passwordService = passwordService;
    }

    [HttpPost]
    [Authorize(Roles = "AssetManager")] // Only AssetManager can create
    public async Task<IActionResult> CreateEmployee(CreateEmployeeRequest request)
    {
        // 1️⃣ Validate unique email
        var emailExists = await _context.Employees
            .AnyAsync(e => e.Email == request.Email);

        if (emailExists)
            return BadRequest("Email already exists.");

        // 2️⃣ Hash password
        var passwordHash = _passwordService.HashPassword(request.Password);

        // 3️⃣ Map DTO → Entity
        var employee = new Employee
        {
            UserId = request.UserId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            DepartmentId = request.DepartmentId,
            Title = request.Title,
            Level = Enum.Parse<Level>(request.Level),
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = passwordHash,
            Role = Enum.Parse<Role>(request.Role),
            Status = EmployeeStatus.Active, // Default rule
            CreatedAt = DateTime.UtcNow
        };

        // 4️⃣ Save
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return Ok("Employee created successfully.");
    }




    [HttpGet]
    [Authorize(Roles = "Manager,AssetManager")]
    public async Task<IActionResult> GetAllEmployees()
    {
        var employees = await _context.Employees
            .Select(e => new EmployeeResponse
            {
                Id = e.Id,
                UserId = e.UserId,
                FullName = e.FirstName + " " + e.LastName,
                Email = e.Email,
                Title = e.Title,
                Role = e.Role.ToString(),
                Status = e.Status.ToString()
            })
            .ToListAsync();

        return Ok(employees);
    }


 




    [HttpGet("{id}")]
    [Authorize(Roles = "Manager,AssetManager")]
    public async Task<IActionResult> GetEmployeeById(int id)
    {
        var employee = await _context.Employees
            .Where(e => e.Id == id)
            .Select(e => new EmployeeResponse
            {
                Id = e.Id,
                UserId = e.UserId,
                FullName = e.FirstName + " " + e.LastName,
                Email = e.Email,
                Title = e.Title,
                Role = e.Role.ToString(),
                Status = e.Status.ToString()
            })
            .FirstOrDefaultAsync();

        if (employee == null)
            return NotFound("Employee not found.");

        return Ok(employee);
    }






    [HttpGet("my-profile")]
    public async Task<IActionResult> GetMyProfile()
    {
        var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(idClaim))
            return Unauthorized();

        var employeeId = int.Parse(idClaim);

        var employee = await _context.Employees
            .Where(e => e.Id == employeeId) // now correct PK comparison
            .Select(e => new EmployeeResponse
            {
                Id = e.Id,
                UserId = e.UserId,
                FullName = e.FirstName + " " + e.LastName,
                Email = e.Email,
                Title = e.Title,
                Role = e.Role.ToString(),
                Status = e.Status.ToString()
            })
            .FirstOrDefaultAsync();

        if (employee == null)
            return NotFound();

        return Ok(employee);
    }

}