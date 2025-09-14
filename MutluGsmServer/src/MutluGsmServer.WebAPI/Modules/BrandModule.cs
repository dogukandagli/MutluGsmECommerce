using MediatR;
using MutluGsmServer.Application.Features.Brands.Commands.CreateBrands;
using System.Threading;
using TS.Result;

namespace MutluGsmServer.WebAPI.Modules;

public static class BrandModule
{
    public static void RegisterBrandRoutes (this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/brands").WithTags("Brands");

        group.MapPost(string.Empty,
            async(BrandCreateCommand request ,ISender sender , CancellationToken cancellationToken)=>
            {
                var response = await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }
            ).Produces<Result<string>>()
            .WithName("BrandCreate"); 
    }
}
