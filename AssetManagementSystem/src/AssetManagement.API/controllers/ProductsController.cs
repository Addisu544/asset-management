using AssetManagement.API.Controllers;
using AssetManagement.API.Models;
using AssetManagement.Domain.Entities;
using AssetManagement.Domain.Enums;
using AssetManagement.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(AppDbContext context, ILogger<ProductsController> logger)
    {
        _context = context;
        _logger = logger;

    }

// ==============================
// 🔹 CREATE PRODUCT
// ==============================
[HttpPost]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> Create(CreateProductFormRequest request)
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


        string? imagePath = null;

        if (request.Image != null)
        {
            var folderPath = Path.Combine("wwwroot/images/products");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(request.Image.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Image.CopyToAsync(stream);
            }

            imagePath = $"images/products/{fileName}";
        }


        var product = new Product
        {
            TagNo = request.TagNo,
            AssetGroupId = request.AssetGroupId,
            AssetTypeId = request.AssetTypeId,
            StockedAt = request.StockedAt,
            ImagePath = imagePath,
            Brand = request.Brand,
            Cost = request.Cost,
            SerialNo = request.SerialNo,
            Status = ProductStatus.Free,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        //log event
        _logger.LogInformation("Product created successfully. Product ID: {ProductId}, TagNo: {TagNo}, SerialNo: {SerialNo}",
                           product.Id, product.TagNo, product.SerialNo);
        return Ok("Product created successfully.");
    }

    // ==============================
    // 🔹 GET ALL (Manager & AssetManager)
    // ==============================
    [HttpGet]
    //[Authorize(Roles = "Manager,AssetManager")]
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



    // ==============================
    // 🔹 GET CURRENTLY OWNED PRODUCTS BY EMPLOYEE
    // ==============================
    [HttpGet("my-products")]
    //[Authorize(Roles = "Employee")]
    public async Task<IActionResult> GetMyProducts()
    {
        // Get the logged-in user's employee ID
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        // Get the products that are currently owned by the logged-in employee (where returnedAt is null)
        var products = await _context.AssetTransactions
            .Where(t => t.EmployeeId == userId && t.TransactionType == TransactionType.Issue && t.Product.Status == ProductStatus.Taken)
            .Include(t => t.Product)
                .ThenInclude(p => p.AssetType)
            .Include(t => t.Product)
                .ThenInclude(p => p.AssetGroup)
            .Select(t => new ProductResponse
            {
                Id = t.Product.Id,
                TagNo = t.Product.TagNo,
                GroupName = t.Product.AssetGroup.GroupName,
                TypeName = t.Product.AssetType.TypeName,
                Brand = t.Product.Brand,
                Cost = t.Product.Cost,
                SerialNo = t.Product.SerialNo,
                Status = t.Product.Status.ToString(),
                ImagePath = t.Product.ImagePath,
                StockedAt = t.Product.StockedAt,
                CreatedAt = t.Product.CreatedAt
            })
            .ToListAsync();

        // Return the list of products
        return Ok(products);
    }



    //// ==============================
    //// 🔹 UPDATE PRODUCT
    //// ==============================
    //[HttpPut("{id}")]
    //[Authorize(Roles = "AssetManager")]
    //public async Task<IActionResult> Update(int id, UpdateProductRequest request)
    //{
    //    var product = await _context.Products.FindAsync(id);

    //    if (product == null)
    //        return NotFound("Product not found.");

    //    if (product.Status == ProductStatus.Taken)
    //        return BadRequest("Cannot edit a taken product.");

    //    //if (await _context.Products
    //    //    .AnyAsync(p => p.SerialNo == request.SerialNo && p.Id != id))
    //    //    return BadRequest("Serial number already exists.");

    //    var typeValid = await _context.AssetTypes
    //        .AnyAsync(t => t.Id == request.AssetTypeId &&
    //                       t.GroupId == request.AssetGroupId);

    //    if (!typeValid)
    //        return BadRequest("Invalid group/type combination.");

    //    product.AssetGroupId = request.AssetGroupId;
    //    product.AssetTypeId = request.AssetTypeId;
    //    product.StockedAt = request.StockedAt;
    //    product.ImagePath = request.ImagePath;
    //    product.Brand = request.Brand;
    //    product.Cost = request.Cost;
    //    product.SerialNo = request.SerialNo;

    //    await _context.SaveChangesAsync();

    //    return Ok("Product updated successfully.");
    //}

    [HttpPut("{id}")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> Update(int id, [FromForm] UpdateProductFormRequest request)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound("Product not found.");

        if (product.Status == ProductStatus.Taken)
            return BadRequest("Cannot edit a taken product.");

        var typeValid = await _context.AssetTypes
            .AnyAsync(t => t.Id == request.AssetTypeId &&
                           t.GroupId == request.AssetGroupId);

        if (!typeValid)
            return BadRequest("Invalid group/type combination.");

        //  HANDLE IMAGE UPDATE
        if (request.Image != null)
        {
            var folderPath = Path.Combine("wwwroot/images/products");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            //  DELETE OLD IMAGE
            if (!string.IsNullOrEmpty(product.ImagePath))
            {
                var oldPath = Path.Combine("wwwroot", product.ImagePath);

                if (System.IO.File.Exists(oldPath))
                    System.IO.File.Delete(oldPath);
            }

            //  SAVE NEW IMAGE
            var fileName = Guid.NewGuid() + Path.GetExtension(request.Image.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Image.CopyToAsync(stream);
            }

            product.ImagePath = $"images/products/{fileName}";
        }
      

        //   UPDATE OTHER FIELDS
        product.AssetGroupId = request.AssetGroupId;
        product.AssetTypeId = request.AssetTypeId;
        product.StockedAt = request.StockedAt;
        product.Brand = request.Brand;
        product.Cost = request.Cost;
        product.SerialNo = request.SerialNo;

        await _context.SaveChangesAsync();
        _logger.LogInformation("Product updated successfully. Product ID: {ProductId}, TagNo: {TagNo}, SerialNo: {SerialNo}",
                                  product.Id, product.TagNo, product.SerialNo);
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


        // delete safely
        if (!string.IsNullOrEmpty(product.ImagePath))
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", product.ImagePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            //if not exist, just ignore and continue with deletion
        }



        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        //log event
        _logger.LogInformation("Product deleted successfully. Product ID: {ProductId}, TagNo: {TagNo}, SerialNo: {SerialNo}",
                                       product.Id, product.TagNo, product.SerialNo);

        return Ok("Product deleted successfully.");
    }
}