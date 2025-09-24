using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;

namespace MutluGsmServer.Application.Features.Products.Queries.GetAllProduct;

public sealed class ProductDto : EntityDto
{
    public string Name { get; set; } = default!;
    public int Quantity { get; set; } = default!;

    public decimal Price { get; set; } = default!;
    public decimal? OriginalPrice { get; set; }
    public int Condition { get; set; } = default!;
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;
    public Guid? brandId { get; set; }
    public string? BrandName { get; set; }
    public string? Description { get; set; }
    public bool featured { get; set; }
    public string? mainImageUrl { get; set; } = default!;
    public List<string> imageUrl { get; set; } = new();

}

public static class ProductExtensions
{
    public static IQueryable<ProductDto> MapTo(this IQueryable<EntityWithAuditDto<Product>> entities,
        IQueryable<Category> categories,
        IQueryable<Brand> brands,
        IQueryable<ProductImage> productImages)
    {

        var res = (from Entity in entities
                   join Category in categories on Entity.Entity.CategoryId equals Category.Id
                   join Brand in brands on Entity.Entity.BrandId equals Brand.Id into bj
                   from Brand in bj.DefaultIfEmpty()
                   select new ProductDto
                   {
                       Name = Entity.Entity.Name.Value,
                       brandId = Entity.Entity.BrandId,
                       BrandName = Brand.Name.Value,
                       CategoryId = Entity.Entity.CategoryId,
                       CategoryName = Category.Name.Value,
                       Condition = Entity.Entity.Condition.Value,
                       CreatedDate = Entity.Entity.CreatedDate,
                       DeletedDate = Entity.Entity.DeletedDate,
                       Description = Entity.Entity.Description,
                       featured = Entity.Entity.Featured,
                       IsActive = Entity.Entity.IsActive,
                       IsDeleted = Entity.Entity.IsDeleted,
                       OriginalPrice = Entity.Entity.OriginalPrice,
                       Price = Entity.Entity.Price,
                       Quantity = Entity.Entity.Quantity.Value,
                       UpdatedDate = Entity.Entity.UpdatedDate,
                       Id = Entity.Entity.Id,
                       mainImageUrl = Entity.Entity._images.Where(i => i.IsMain == true).Select(i => i.ImageUrl).FirstOrDefault(),
                       imageUrl = Entity.Entity._images.Where(i => i.IsMain == false).Select(i => i.ImageUrl).ToList()
                   }
                       ).AsQueryable();

        return res;


        //return entities
        // .Join(categories,
        //      e => e.Entity.CategoryId,
        //      c => c.Id,
        //      (e, category) => new { e.Entity, Category = category })
        //.Join(brands,
        //      ec => ec.Entity.BrandId,
        //      b => b.Id,
        //      (ec, brand) => new { ec.Entity, ec.Category, Brand = brand })
        //    .Select(x => new ProductDto
        //    {
        //        Name = x.Entity.Name.Value,
        //        brandId = x.Entity.BrandId,
        //        BrandName = x.Brand.Name.Value ,
        //        CategoryId = x.Entity.CategoryId,
        //        CategoryName = x.Category.Name.Value,
        //        Condition = x.Entity.Condition.Value,
        //        CreatedDate = x.Entity.CreatedDate,
        //        DeletedDate = x.Entity.DeletedDate,
        //        Description = x.Entity.Description,
        //        featured = x.Entity.Featured,
        //        IsActive = x.Entity.IsActive,
        //        IsDeleted = x.Entity.IsDeleted,
        //        OriginalPrice = x.Entity.OriginalPrice,
        //        Price = x.Entity.Price,
        //        Quantity = x.Entity.Quantity.Value,
        //        UpdatedDate = x.Entity.UpdatedDate,
        //        Id = x.Entity.Id,
        //    });
    }
}