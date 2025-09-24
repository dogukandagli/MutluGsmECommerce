using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Products;

public sealed class Product : Entity
{
    private Product() { }
    public Product(Name name,
        Quantity qty,
        decimal price,
        decimal? originalPrice,
                   ConditionEnum condition,
                   Guid categoryId, Guid? brandId,
                   string? description,
                   bool featured = false
                   )
    {
        SetName(name);
        SetQuantity(qty);
        SetPrice(price);
        SetOriginalPrice(originalPrice);
        SetCondition(condition);
        SetCategoryId(categoryId);
        SetBrandId(brandId);
        SetDescription(description);
        SetFeatured(featured);
    }

    public Name Name { get; private set; }
    public Quantity Quantity { get; private set; }
    public decimal Price { get; private set; }
    public decimal? OriginalPrice { get; private set; }
    public ConditionEnum Condition { get; private set; }
    public string? Description { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; }
    public Guid? BrandId { get; private set; }
    public Brand Brand { get; private set; }

    public ICollection<ProductImage> _images { get; private set; } = new List<ProductImage>();

    public bool Featured { get; private set; }

    public void SetProductImage(ICollection<ProductImage> productImages)
    {
        _images = productImages;
    }

    public void SetName(Name name)
    {
        Name = name;
    }
    public void SetQuantity(Quantity qty)
    {
        Quantity = qty;
    }
    public void SetPrice(decimal price)
    {
        if (price < 0)
            throw new ArgumentException("Fiyat negatif olamaz.");
        Price = price;
    }
    public void SetOriginalPrice(decimal? originalPrice)
    {
        if (originalPrice < 0)
            throw new ArgumentException("Fiyat negatif olamaz.");
        OriginalPrice = originalPrice;
    }
    public void SetCondition(ConditionEnum condition)
    {
        Condition = condition;
    }
    public void SetDescription(string? description)
    {
        Description = description; // boş olabilir
    }

    public void SetCategoryId(Guid categoryId)
    {
        if (categoryId == Guid.Empty)
            throw new ArgumentException("Kategori ID boş olamaz.");
        CategoryId = categoryId;
    }

    public void SetBrandId(Guid? brandId)
    {
        if (brandId == Guid.Empty)
            throw new ArgumentException("Marka ID boş olamaz.");
        BrandId = brandId;
    }

    public void SetFeatured(bool featured)
    {
        Featured = featured;
    }

    public void AddImage(string imageUrl, bool isMain = false)
    {
        if (_images.Any(i => i.ImageUrl == imageUrl))
            throw new ArgumentException("Bu resim zaten ekli.");
        if (isMain && _images.Any(i => i.IsMain))
            throw new ArgumentException("Zaten ana resim var. Önce onu kaldırın.");

        var makeMain = isMain || !_images.Any();

        _images.Add(new ProductImage(imageUrl, Id, makeMain));
    }

    public void RemoveImage(Guid imageId)
    {
        var image = _images.FirstOrDefault(i => i.Id == imageId);
        if (image == null)
            throw new ArgumentException("Resim bulunamadı.");
        _images.Remove(image);
    }
    public void SetMainImage(Guid imageGuid)
    {
        if (!_images.Any(i => i.Id == imageGuid))
        {
            throw new ArgumentException("Resim bulunamadı.");
        }

        foreach (var img in _images)
        {
            img.SetMain(img.Id == imageGuid);
        }
    }

}
