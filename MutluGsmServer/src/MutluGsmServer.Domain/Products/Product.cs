using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Products;

public sealed class Product : Entity
{
    public Guid Id { get; set; }
    public Name Name { get; set; }
    public Quantity Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public ConditionEnum Condition { get; set; } 
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
    public Guid BrandId { get; set; }
    public Brand Brand { get; set; }
    public ICollection<ProductImage> ProductImages { get; set; }

}
