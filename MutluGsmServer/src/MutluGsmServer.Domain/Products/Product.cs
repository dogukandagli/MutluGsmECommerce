using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Products;

public sealed class Product : Entity
{
    private Product() { }
    public Product(Name name
        , List<ProductImage> Images,
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
        SetProductImages(Images);
    }

    public Name Name { get; private set; } = default!;
    public Quantity Quantity { get; private set; } = default!;
    public decimal Price { get; private set; }
    public decimal? OriginalPrice { get; private set; }
    public ConditionEnum Condition { get; private set; }
    public string? Description { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = default!;
    public Guid? BrandId { get; private set; }
    public Brand? Brand { get; private set; }
    public List<ProductImage> _images = new List<ProductImage>();
    public bool Featured { get; private set; }

    public void SetProductImages(ICollection<ProductImage> images)
    {
        _images.Clear();
        _images.AddRange(images);
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

}
