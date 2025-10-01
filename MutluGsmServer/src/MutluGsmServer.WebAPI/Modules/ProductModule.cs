using MediatR;
using Microsoft.AspNetCore.Mvc;
using MutluGsmServer.Application.Features.Products.Commands.CreateProduct;
using MutluGsmServer.Application.Features.Products.Commands.ProductDelete;
using MutluGsmServer.Application.Features.Products.Commands.UpdateProduct;
using MutluGsmServer.Application.Features.Products.Queries;
using TS.Result;

namespace MutluGsmServer.WebAPI.Modules;

public static class ProductModule
{
    public static void RegisterProductRoutes(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/products").WithTags("Products").RequireAuthorization();

        group.MapPost(string.Empty,
            async ([FromForm] ProductCreateCommand request, ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            )
            .Accepts<ProductCreateCommand>("multipart/form-data")
            .Produces<Result<string>>()
            .WithName("ProductCreate")
            .DisableAntiforgery();

        group.MapPut(string.Empty,
            async ([FromForm] ProductUpdateCommand request, ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            )
            .Accepts<ProductUpdateCommand>("multipart/form-data")
            .Produces<Result<string>>()
            .WithName("UpdateProduct")
            .DisableAntiforgery()
            ;

        group.MapDelete("{id}",
            async (Guid id, ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new ProductDeleteCommand(id), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            ).Produces<Result<string>>()
            .WithName("ProductDelete");
        group.MapGet("{id}",
          async (Guid id, ISender sender, CancellationToken cancellationToken) =>
          {
              var response = await sender.Send(new ProductGetQuery(id), cancellationToken);
              return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
          }
          ).Produces<Result<ProductDto>>()
          .WithName("ProductGet");
    }
}
