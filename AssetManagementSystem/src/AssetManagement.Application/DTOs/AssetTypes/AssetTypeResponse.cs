namespace AssetManagement.Application.DTOs.AssetTypes;

public class AssetTypeResponse
{
    public int Id { get; set; }
    public string TypeName { get; set; } = default!;
    public int AssetGroupId { get; set; }
    public string GroupName { get; set; } = default!;
}