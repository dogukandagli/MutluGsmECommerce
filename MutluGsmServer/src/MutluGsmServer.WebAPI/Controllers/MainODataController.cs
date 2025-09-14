using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using MutluGsmServer.Application.Features.Brands.Queries.GetAllBrand;
using MutluGsmServer.Application.Features.Categories.Queries.GetAllCategory;
using MutluGsmServer.Application.Features.Products.Queries.GetAllProduct;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MutluGsmServer.WebAPI.Controllers;

[Route("odata")]
[ApiController]
[EnableQuery]
public class MainODataController(ISender sender)  : ODataController
{
    public static IEdmModel GetEdmModel()
    {
        ODataConventionModelBuilder builder = new();
        builder.EnableLowerCamelCase();
        builder.EntitySet<CategoryGetAllQueryResponse>("Categories");
        builder.EntitySet<ProductDto>("Products");
        builder.EntitySet<BrandGetAllQueryResponse>("Brands");

        return builder.GetEdmModel();
    }

    [HttpGet("Categories")]
    public async Task<IQueryable<CategoryGetAllQueryResponse>> GetAllCategories(CancellationToken cancellationToken)
    {
        var response = await sender.Send(new CategoryGetAllQuery(),cancellationToken);
        return response;
    }

    [HttpGet("Products")]
    public async Task<IQueryable<ProductDto>> GetAllProducts(CancellationToken cancellationToken)
    {
        var response = await sender.Send(new ProductGetAllQuery(), cancellationToken);
        return response;
    }

    [HttpGet("Brands")]
    public async Task<IQueryable<BrandGetAllQueryResponse>> GetAllBrands(CancellationToken cancellationToken)
    {
        var response = await sender.Send(new BrandGetAllQuery(), cancellationToken);
        return response;
    }
}
