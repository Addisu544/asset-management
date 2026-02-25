using AssetManagement.API.Models.Auth;
using AssetManagement.Application.Interfaces;
using AssetManagement.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordService _passwordService;
        private readonly IJwtService _jwtService;

        public AuthController(
            AppDbContext context,
            IPasswordService passwordService,
            IJwtService jwtService)
        {
            _context = context;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            //  Check if email exists
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Email == request.Email);

            if (employee == null)
                return Unauthorized("Invalid email or password.");

            //  Check password
            var isPasswordValid = _passwordService
                .VerifyPassword(request.Password, employee.PasswordHash);

            if (!isPasswordValid)
                return Unauthorized("Invalid email or password.");

            //  Check if employee is active
            if (employee.Status != Domain.Enums.EmployeeStatus.Active)
                return Unauthorized("Account is inactive.");

            //  Generate JWT
            var token = _jwtService.GenerateToken(employee);

            //  Return token
            return Ok(new
            {
                Token = token,
                Email = employee.Email,
                Role = employee.Role.ToString()
            });
        }

        [HttpGet("my-profile")]
        public IActionResult GetMyProfile()
        {
            return Ok("Accessible by any authenticated user.");
        }
    }
}