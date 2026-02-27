using AssetManagement.Application.DTOs.Departments;
using AssetManagement.Domain.Entities;
using AssetManagement.Infrastructure.Data;
//using AssetManagement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "AssetManager")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public DepartmentsController(AppDbContext context)
    {
        _context = context;
    }

    // 🔹 CREATE
    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentRequest request)
    {
        var exists = await _context.Departments
            .AnyAsync(d => d.DepartmentName == request.Name);

        if (exists)
            return BadRequest("Department already exists.");

        var department = new Department
        {
            DepartmentName = request.Name
        };

        _context.Departments.Add(department);
        await _context.SaveChangesAsync();

        return Ok("Department created successfully.");
    }

    // 🔹 GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _context.Departments
            .Select(d => new DepartmentResponse
            {
                Id = d.Id,
                Name = d.DepartmentName
            })
            .ToListAsync();

        return Ok(departments);
    }

    // 🔹 UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateDepartmentRequest request)
    {
        var department = await _context.Departments.FindAsync(id);

        if (department == null)
            return NotFound("Department not found.");

        var exists = await _context.Departments
            .AnyAsync(d => d.DepartmentName == request.Name && d.Id != id);

        if (exists)
            return BadRequest("Another department with same name exists.");

        department.DepartmentName = request.Name;

        await _context.SaveChangesAsync();

        return Ok("Department updated successfully.");
    }

    // 🔹 DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var department = await _context.Departments
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (department == null)
            return NotFound("Department not found.");

        if (department.Employees.Any())
            return BadRequest("Cannot delete department because it is assigned to employees.");

        _context.Departments.Remove(department);
        await _context.SaveChangesAsync();

        return Ok("Department deleted successfully.");
    }
}