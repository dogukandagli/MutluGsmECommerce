using MediatR;
using MutluGsmServer.Application.Features.Categories.Commands.CreateCategory;
using MutluGsmServer.Application.Features.Products.Commands.CreateProduct;
using TS.Result;

namespace MutluGsmServer.WebAPI.Modules;

public static class ProductModule
{
    public static void RegisterProductRoutes(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/products").WithTags("Products");

        group.MapPost(string.Empty,
            async (ProductCreateCommand request, ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            ).Produces<Result<string>>()
            .WithName("ProductCreate");
    }
}
