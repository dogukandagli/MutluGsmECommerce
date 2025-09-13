using MediatR;
using MutluGsmServer.Application.Features.Categories.Commands.CreateCategory;
using System.Threading;
using TS.Result;

namespace MutluGsmServer.WebAPI.Modules;

public static class CategoryModule
{
    public static void RegisterCategoryRoutes(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/categories").WithTags("Categories");

        group.MapPost(string.Empty,
            async (CreateCategoryCommand request, ISender sender, CancellationToken cancellationToken) =>
            {
                var response =await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            ).Produces<Result<string>>()
            .WithName("CategoryCreate");
    }
}
