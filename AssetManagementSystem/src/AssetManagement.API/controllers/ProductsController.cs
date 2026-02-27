using AssetManagement.Domain.Entities;
using AssetManagement.Domain.Enums;
using AssetManagement.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // ==============================
    // 🔹 CREATE PRODUCT
    // ==============================
    [HttpPost]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> Create(CreateProductRequest request)
    {
        if (await _context.Products.AnyAsync(p => p.TagNo == request.TagNo))
            return BadRequest("Tag number already exists.");

        if (await _context.Products.AnyAsync(p => p.SerialNo == request.SerialNo))
            return BadRequest("Serial number already exists.");

        var typeValid = await _context.AssetTypes
            .AnyAsync(t => t.Id == request.AssetTypeId &&
                           t.GroupId == request.AssetGroupId);

        if (!typeValid)
            return BadRequest("Invalid group/type combination.");

        var product = new Product
        {
            TagNo = request.TagNo,
            AssetGroupId = request.AssetGroupId,
            AssetTypeId = request.AssetTypeId,
            StockedAt = request.StockedAt,
            ImagePath = request.ImagePath,
            Brand = request.Brand,
            Cost = request.Cost,
            SerialNo = request.SerialNo,
            Status = ProductStatus.Free,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok("Product created successfully.");
    }

    // ==============================
    // 🔹 GET ALL (Manager & AssetManager)
    // ==============================
    [HttpGet]
    [Authorize(Roles = "Manager,AssetManager")]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context.Products
            .Include(p => p.AssetGroup)
            .Include(p => p.AssetType)
            .Select(p => new ProductResponse
            {
                Id = p.Id,
                TagNo = p.TagNo,
                GroupName = p.AssetGroup.GroupName,
                TypeName = p.AssetType.TypeName,
                Brand = p.Brand,
                Cost = p.Cost,
                SerialNo = p.SerialNo,
                Status = p.Status.ToString(),
                ImagePath = p.ImagePath,
                StockedAt = p.StockedAt,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();

        return Ok(products);
    }

    // ==============================
    // 🔹 GET OWN ASSIGNED PRODUCTS (Employee)
    // ==============================
    //[HttpGet("my-products")]
    //[Authorize(Roles = "Employee")]
    //public async Task<IActionResult> GetMyProducts()
    //{
    //    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

    //    var products = await _context.AssetTransactions
    //        .Where(t => t.EmployeeId == userId && t.ReturnedAt == null)
    //        .Include(t => t.Product)
    //            .ThenInclude(p => p.AssetType)
    //        .Include(t => t.Product)
    //            .ThenInclude(p => p.AssetGroup)
    //        .Select(t => new ProductResponse
    //        {
    //            Id = t.Product.Id,
    //            TagNo = t.Product.TagNo,
    //            GroupName = t.Product.AssetGroup.GroupName,
    //            TypeName = t.Product.AssetType.TypeName,
    //            Brand = t.Product.Brand,
    //            Cost = t.Product.Cost,
    //            SerialNo = t.Product.SerialNo,
    //            Status = t.Product.Status.ToString(),
    //            ImagePath = t.Product.ImagePath,
    //            StockedAt = t.Product.StockedAt,
    //            CreatedAt = t.Product.CreatedAt
    //        })
    //        .ToListAsync();

    //    return Ok(products);
    //}

    //// ==============================
    //// 🔹 UPDATE PRODUCT
    //// ==============================
    [HttpPut("{id}")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> Update(int id, UpdateProductRequest request)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound("Product not found.");

        if (product.Status == ProductStatus.Taken)
            return BadRequest("Cannot edit a taken product.");

        //if (await _context.Products
        //    .AnyAsync(p => p.SerialNo == request.SerialNo && p.Id != id))
        //    return BadRequest("Serial number already exists.");

        var typeValid = await _context.AssetTypes
            .AnyAsync(t => t.Id == request.AssetTypeId &&
                           t.GroupId == request.AssetGroupId);

        if (!typeValid)
            return BadRequest("Invalid group/type combination.");

        product.AssetGroupId = request.AssetGroupId;
        product.AssetTypeId = request.AssetTypeId;
        product.StockedAt = request.StockedAt;
        product.ImagePath = request.ImagePath;
        product.Brand = request.Brand;
        product.Cost = request.Cost;
        product.SerialNo = request.SerialNo;

        await _context.SaveChangesAsync();

        return Ok("Product updated successfully.");
    }

    //// ==============================
    //// 🔹 DELETE PRODUCT
    //// ==============================
    [HttpDelete("{id}")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound("Product not found.");

        if (product.Status == ProductStatus.Taken)
            return BadRequest("Cannot delete a taken product.");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok("Product deleted successfully.");
    }
}