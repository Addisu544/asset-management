using AssetManagement.Application.DTOs.AssetTypes;
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
public class AssetTypesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AssetTypesController(AppDbContext context)
    {
        _context = context;
    }

    // 🔹 CREATE under group
    [HttpPost]
    public async Task<IActionResult> Create(CreateAssetTypeRequest request)
    {
        var groupExists = await _context.AssetGroups
            .AnyAsync(g => g.Id == request.AssetGroupId);

        if (!groupExists)
            return BadRequest("Asset group does not exist.");

        var exists = await _context.AssetTypes
            .AnyAsync(t =>
                t.TypeName == request.TypeName &&
                t.GroupId == request.AssetGroupId);

        if (exists)
            return BadRequest("Asset type already exists in this group.");

        var type = new AssetType
        {
            TypeName = request.TypeName,
            GroupId = request.AssetGroupId
        };

        _context.AssetTypes.Add(type);
        await _context.SaveChangesAsync();

        return Ok("Asset type created successfully.");
    }

    // 🔹 GET by group
    [HttpGet("by-group/{groupId}")]
    public async Task<IActionResult> GetByGroup(int groupId)
    {
        var types = await _context.AssetTypes
            .Where(t => t.GroupId == groupId)
            .Select(t => new AssetTypeResponse
            {
                Id = t.Id,
                TypeName = t.TypeName,
                AssetGroupId = t.GroupId,
                GroupName = t.AssetGroup.GroupName
            })
            .ToListAsync();

        return Ok(types);
    }

    // 🔹 UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateAssetTypeRequest request)
    {
        var type = await _context.AssetTypes.FindAsync(id);

        if (type == null)
            return NotFound("Asset type not found.");

        var groupExists = await _context.AssetGroups
            .AnyAsync(g => g.Id == request.AssetGroupId);

        if (!groupExists)
            return BadRequest("Asset group does not exist.");

        var exists = await _context.AssetTypes
            .AnyAsync(t =>
                t.TypeName == request.TypeName &&
                t.GroupId == request.AssetGroupId &&
                t.Id != id);

        if (exists)
            return BadRequest("Another type with same name exists in this group.");

        type.TypeName = request.TypeName;
        type.GroupId = request.AssetGroupId;

        await _context.SaveChangesAsync();

        return Ok("Asset type updated successfully.");
    }

    // 🔹 DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var type = await _context.AssetTypes
            //.Include(t => t.Assets) // prepare for future rule
            .FirstOrDefaultAsync(t => t.Id == id);

        if (type == null)
            return NotFound("Asset type not found.");

        //if (type.Assets.Any())
        //    return BadRequest("Cannot delete type because it is referenced by assets.");

        _context.AssetTypes.Remove(type);
        await _context.SaveChangesAsync();

        return Ok("Asset type deleted successfully.");
    }
}