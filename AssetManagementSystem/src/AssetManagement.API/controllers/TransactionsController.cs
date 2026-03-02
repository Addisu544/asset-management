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
public class TransactionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransactionsController(AppDbContext context)
    {
        _context = context;
    }

    // ==============================
    // 🔹 ISSUE PRODUCT
    // ==============================
    [HttpPost("issue")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> IssueProduct(IssueProductRequest request)
    {
        // 1️⃣ Validate Employee exists & Active
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId);

        if (employee == null)
            return NotFound("Employee not found.");

        if (employee.Status != EmployeeStatus.Active)
            return BadRequest("Cannot issue to inactive employee.");

        // 2️⃣ Validate Product exists
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == request.ProductId);

        if (product == null)
            return NotFound("Product not found.");

        // 3️⃣ Validate Product is Free
        if (product.Status != ProductStatus.Free)
            return BadRequest("Product is already taken.");

        // 4️⃣ Get Logged-in AssetManager Id
        var issuerId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        // 5️⃣ Create Transaction
        var transaction = new AssetTransaction
        {
            EmployeeId = employee.Id,
            ProductId = product.Id,
            TransactionType = TransactionType.Issue,
            IssuedBy = issuerId,
            CreatedAt = DateTime.UtcNow
        };

        // 6️⃣ Update Product Status
        product.Status = ProductStatus.Taken;

        _context.AssetTransactions.Add(transaction);

        // 7️⃣ Save Changes (Single Save)
        await _context.SaveChangesAsync();

        return Ok("Product issued successfully.");
    }




    // ==============================
    // 🔹 RETURN PRODUCT
    // ==============================
    [HttpPost("return")]
    [Authorize(Roles = "AssetManager")]
    public async Task<IActionResult> ReturnProduct(ReturnProductRequest request)
    {
        // 1️⃣ Validate Product exists
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == request.ProductId);

        if (product == null)
            return NotFound("Product not found.");

        // 2️⃣ Validate Product is Taken
        if (product.Status != ProductStatus.Taken)
            return BadRequest("Product is not currently taken.");

        // 3️⃣ Find last Issue transaction (optional but recommended safety)
        var lastIssue = await _context.AssetTransactions
            .Where(t => t.ProductId == request.ProductId &&
                        t.TransactionType == TransactionType.Issue)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync();

        if (lastIssue == null)
            return BadRequest("No issue record found for this product.");

        // 4️⃣ Get logged-in AssetManager Id
        var issuerId = int.Parse(
            User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value
        );

        // 5️⃣ Create Return transaction
        var returnTransaction = new AssetTransaction
        {
            EmployeeId = lastIssue.EmployeeId, // Return from same employee
            ProductId = product.Id,
            TransactionType = TransactionType.Return,
            IssuedBy = issuerId,
            CreatedAt = DateTime.UtcNow
        };

        // 6️⃣ Update Product Status
        product.Status = ProductStatus.Free;

        _context.AssetTransactions.Add(returnTransaction);

        // 7️⃣ Save once
        await _context.SaveChangesAsync();

        return Ok("Product returned successfully.");
    }





}