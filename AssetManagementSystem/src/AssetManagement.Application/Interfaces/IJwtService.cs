

using AssetManagement.Domain.Entities;


namespace AssetManagement.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(Employee employee);
    }
}