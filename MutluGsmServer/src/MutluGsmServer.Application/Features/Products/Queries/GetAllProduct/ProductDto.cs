using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Application.Features.Products.Queries.GetAllProduct;

public sealed class ProductDto : EntityDto
{
    public string Name { get; set; } = default!;
    public  int Quantity { get; set; } = default!;
    public decimal Price = default!;
    public decimal? OriginalPrice { get; set; }
    public int Condition { get; set; } = default!;
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;
    public Guid? brandId { get; set; }
    public string? BrandName { get; set; } 
    public string? Description { get; set; }
    public bool featured { get; set; }
}

public static class ProductExtensions
{
    public static IQueryable<ProductDto> MapTo(this IQueryable<EntityWithAuditDto<Product>> entities,
        IQueryable<Category> categories,
        IQueryable<Brand> brands)
    {
        return entities
         .Join(categories,
              e => e.Entity.CategoryId,
              c => c.Id,
              (e, category) => new { e.Entity, Category = category })
        .Join(brands,
              ec => ec.Entity.BrandId,
              b => b.Id,
              (ec, brand) => new { ec.Entity, ec.Category, Brand = brand })
            .Select(x => new ProductDto
            {
              Name = x.Entity.Name.Value,
              Quantity = x.Entity.Quantity.Value,
              Price = x.Entity.Price,
              OriginalPrice = x.Entity.OriginalPrice,
              Condition = x.Entity.Condition,
              CategoryId = x.Entity.CategoryId,
              CategoryName = x.Category.Name.Value,
              brandId = x.Entity.BrandId,
              BrandName = x.Brand.Name.Value,
              Description = x.Entity.Description,
              featured = x.Entity.Featured
            });
    }
}