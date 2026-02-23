namespace AssetManagement.Domain.Entities
{
    public class AssetGroup
    {
        public int Id { get; set; }
        public string GroupName { get; set; } = null!;

        public ICollection<AssetType> AssetTypes { get; set; } = new List<AssetType>();
    }
}