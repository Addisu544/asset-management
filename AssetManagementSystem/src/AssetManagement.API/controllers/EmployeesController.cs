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
using AssetManagement.API.Models;
namespace AssetManagement.API.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize] // All endpoints require authentication
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IPasswordService _passwordService;
    private readonly ILogger<EmployeesController> _logger;

    public EmployeesController(
        AppDbContext context,
        IPasswordService passwordService,
        ILogger<EmployeesController> logger)
    {
        _context = context;
        _passwordService = passwordService;
        _logger = logger;
    }

    //[HttpPost]
    //[Authorize(Roles = "AssetManager")] // Only AssetManager can create
    //public async Task<IActionResult> CreateEmployee(CreateEmployeeRequest request)
    //{
    //    // 1️⃣ Validate unique email
    //    var emailExists = await _context.Employees
    //        .AnyAsync(e => e.Email == request.Email);

    //    if (emailExists)
    //        return BadRequest("Email already exists.");

    //    // 2️⃣ Hash password
    //    var passwordHash = _passwordService.HashPassword(request.Password);

    //    // 3️⃣ Map DTO → Entity
    //    var employee = new Employee
    //    {
    //        UserId = request.UserId,
    //        FirstName = request.FirstName,
    //        LastName = request.LastName,
    //        DepartmentId = request.DepartmentId,
    //        Title = request.Title,
    //        Level = Enum.Parse<Level>(request.Level),
    //        Email = request.Email,
    //        Phone = request.Phone,
    //        PasswordHash = passwordHash,
    //        Role = Enum.Parse<Role>(request.Role),
    //        Status = EmployeeStatus.Active, // Default rule
    //        CreatedAt = DateTime.UtcNow
    //    };

    //    // 4️⃣ Save
    //    _context.Employees.Add(employee);
    //    await _context.SaveChangesAsync();

    //    //log event
    //    _logger.LogInformation("Employee created successfully. UserId: {UserId}, Email: {Email}, Role: {Role}",
    //                       employee.UserId, employee.Email, employee.Role.ToString());

    //    return Ok("Employee created successfully.");
    //}



    [HttpPost]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> CreateEmployee([FromForm] CreateEmployeeRequest request)
    {
        var emailExists = await _context.Employees.AnyAsync(e => e.Email == request.Email);
        if (emailExists)
            return BadRequest("Email already exists.");

        var passwordHash = _passwordService.HashPassword(request.Password);

        string? imagePath = null;

        //   SAVE IMAGE
        if (request.Image != null)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/employees");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid() + Path.GetExtension(request.Image.FileName);
            var filePath = Path.Combine(folder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await request.Image.CopyToAsync(stream);

            imagePath = $"uploads/employees/{fileName}";
        }

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
            ImagePath = imagePath // ✅ SET
        };

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
                Phone= e.Phone,
                DepartmentName = e.Department.DepartmentName,
                Level = e.Level.ToString(),
                Role = e.Role.ToString(),
                Status = e.Status.ToString(),
                ImagePath = e.ImagePath
            })
            .ToListAsync();

        return Ok(employees);
    }


 




    [HttpGet("{id}")]
    //[Authorize(Roles = "Manager,AssetManager")]
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





    //[HttpPut("{id}")]
    //[Authorize(Roles = "AssetManager")]
    //public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeRequest request)
    //{
    //    var employee = await _context.Employees.FindAsync(id);

    //    if (employee == null)
    //        return NotFound("Employee not found.");

    //    // Update allowed fields
    //    employee.FirstName = request.FirstName;
    //    employee.LastName = request.LastName;
    //    employee.DepartmentId = request.DepartmentId;
    //    employee.Title = request.Title;
    //    employee.Phone = request.Phone;
    //    employee.UserId = request.UserId;
    //    employee.Email = request.Email;
    //    // Convert & validate enums safely
    //    if (!Enum.TryParse(request.Level, out Domain.Enums.Level level))
    //        return BadRequest("Invalid Level value.");

    //    if (!Enum.TryParse(request.Role, out Domain.Enums.Role role))
    //        return BadRequest("Invalid Role value.");

    //    if (!Enum.TryParse(request.Status, out Domain.Enums.EmployeeStatus status))
    //        return BadRequest("Invalid Status value.");

    //    employee.Level = level;
    //    employee.Role = role;
    //    employee.Status = status;

    //    await _context.SaveChangesAsync();

    //    return Ok("Employee updated successfully.");
    //}

    [HttpPut("{id}")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromForm] UpdateEmployeeRequest request)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
            return NotFound("Employee not found.");

        // ✅ IMAGE REPLACEMENT
        if (request.Image != null)
        {
            // delete old image (if exists)
            if (!string.IsNullOrEmpty(employee.ImagePath))
            {
                var oldPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", employee.ImagePath);
                if (System.IO.File.Exists(oldPath))
                    System.IO.File.Delete(oldPath);
            }

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/employees");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid() + Path.GetExtension(request.Image.FileName);
            var filePath = Path.Combine(folder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await request.Image.CopyToAsync(stream);

            employee.ImagePath = $"uploads/employees/{fileName}";
        }

        // update fields
        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.DepartmentId = request.DepartmentId;
        employee.Title = request.Title;
        employee.Phone = request.Phone;
        employee.Email = request.Email;
        employee.UserId = request.UserId;

        employee.Level = Enum.Parse<Level>(request.Level);
        employee.Role = Enum.Parse<Role>(request.Role);
        employee.Status = Enum.Parse<EmployeeStatus>(request.Status);

        await _context.SaveChangesAsync();

        return Ok("Employee updated successfully.");
    }






    [HttpPatch("{id}/status")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> UpdateEmployeeStatus(int id, UpdateEmployeeStatusRequest request)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
            return NotFound("Employee not found.");

        // Validate enum safely
        if (!Enum.TryParse(request.Status, out Domain.Enums.EmployeeStatus status))
            return BadRequest("Invalid status value. Allowed: Active, Inactive.");

        employee.Status = status;

        await _context.SaveChangesAsync();

        //log event
        _logger.LogInformation("Employee status updated successfully. Employee ID: {EmployeeId}, Status: {Status}, Email: {Email}",
                          employee.Id, employee.Status.ToString(), employee.Email);

        return Ok("Employee status updated successfully.");
    }



}