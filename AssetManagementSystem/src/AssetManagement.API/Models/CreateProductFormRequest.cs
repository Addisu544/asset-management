using Microsoft.AspNetCore.Http;
namespace AssetManagement.API.Models
{

    public class CreateProductFormRequest
    {
        public string TagNo { get; set; } = default!;
        public int AssetGroupId { get; set; }
        public int AssetTypeId { get; set; }
        public DateTime StockedAt { get; set; }

        public IFormFile? Image { get; set; } 

        public string Brand { get; set; } = default!;
        public decimal Cost { get; set; }
        public string SerialNo { get; set; } = default!;
    }
}
