namespace AssetManagement.Application.DTOs.AssetTypes;

public class CreateAssetTypeRequest
{
    public string TypeName { get; set; } = default!;
    public int AssetGroupId { get; set; }
}