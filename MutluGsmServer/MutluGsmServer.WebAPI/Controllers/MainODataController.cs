using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using MutluGsmServer.Application.Features.Categories.Queries.GetAllCategory;
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
        return builder.GetEdmModel();
    }

    [HttpGet("Categories")]
    public async Task<IQueryable<CategoryGetAllQueryResponse>> GetAllCategories(CancellationToken cancellationToken)
    {
        var response = await sender.Send(new CategoryGetAllQuery(),cancellationToken);
        return response;
    }
}
