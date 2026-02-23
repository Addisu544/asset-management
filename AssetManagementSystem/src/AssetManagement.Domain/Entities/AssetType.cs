namespace AssetManagement.Domain.Entities
{
    public class AssetType
    {
        public int Id { get; set; }

        public int GroupId { get; set; }
        public AssetGroup AssetGroup { get; set; } = null!;

        public string TypeName { get; set; } = null!;
    }
}