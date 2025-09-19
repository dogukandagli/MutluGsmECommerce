using MutluGsmServer.Domain.Abstractions;

namespace MutluGsmServer.Domain.Products;

public sealed class ProductImage : Entity
{
    public string ImageUrl { get; private set; }
    public Guid ProductId { get;private set; }
    public Product Product { get; private set; }
    public bool IsMain { get;private set; }

    private ProductImage() { }

    public ProductImage( string imageUrl, Guid productId, bool isMain)
    {
        if (string.IsNullOrWhiteSpace(imageUrl))
            throw new ArgumentException("ImageUrl boş olamaz.");
        ImageUrl = imageUrl;
        ProductId = productId;
        IsMain = isMain;
    }

    public void SetMain(bool isMain)
    {
        IsMain = isMain;
    }
}
