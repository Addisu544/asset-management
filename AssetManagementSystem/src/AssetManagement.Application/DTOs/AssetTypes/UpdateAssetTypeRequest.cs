namespace AssetManagement.Application.DTOs.AssetTypes;

public class UpdateAssetTypeRequest
{
    public string TypeName { get; set; } = default!;
    public int AssetGroupId { get; set; }
}