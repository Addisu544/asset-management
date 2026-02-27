using AssetManagement.Application.DTOs.AssetGroups;
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
public class AssetGroupsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AssetGroupsController(AppDbContext context)
    {
        _context = context;
    }

    // 🔹 CREATE
    [HttpPost]
    public async Task<IActionResult> Create(CreateAssetGroupRequest request)
    {
        var exists = await _context.AssetGroups
            .AnyAsync(g => g.GroupName == request.GroupName);

        if (exists)
            return BadRequest("Asset group already exists.");

        var group = new AssetGroup
        {
            GroupName = request.GroupName
        };

        _context.AssetGroups.Add(group);
        await _context.SaveChangesAsync();

        return Ok("Asset group created successfully.");
    }

    // 🔹 GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var groups = await _context.AssetGroups
            .Select(g => new AssetGroupResponse
            {
                Id = g.Id,
                GroupName = g.GroupName
            })
            .ToListAsync();

        return Ok(groups);
    }

    // 🔹 UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateAssetGroupRequest request)
    {
        var group = await _context.AssetGroups.FindAsync(id);

        if (group == null)
            return NotFound("Asset group not found.");

        var exists = await _context.AssetGroups
            .AnyAsync(g => g.GroupName == request.GroupName && g.Id != id);

        if (exists)
            return BadRequest("Another group with same name exists.");

        group.GroupName = request.GroupName;

        await _context.SaveChangesAsync();

        return Ok("Asset group updated successfully.");
    }

    // 🔹 DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var group = await _context.AssetGroups
            .Include(g => g.AssetTypes)
            .FirstOrDefaultAsync(g => g.Id == id);

        if (group == null)
            return NotFound("Asset group not found.");

        if (group.AssetTypes.Any())
            return BadRequest("Cannot delete group because it is referenced by asset types.");

        _context.AssetGroups.Remove(group);
        await _context.SaveChangesAsync();

        return Ok("Asset group deleted successfully.");
    }
}