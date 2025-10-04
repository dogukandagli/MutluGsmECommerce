

using MediatR;
using Microsoft.AspNetCore.Mvc;
using MutluGsmServer.Application.Features.Sliders;
using TS.Result;

namespace MutluGsmServer.WebAPI.Modules;

public static class SliderModule
{
    public static void RegisterSliderRoutes(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/sliders").WithTags("Sliders").RequireAuthorization();

        group.MapPost(string.Empty,
            async ([FromForm] SliderCreateCommand request, ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            }).Accepts<SliderCreateCommand>("multipart/form-data")
            .Produces<Result<string>>()
            .WithName("SliderCreate")
            .DisableAntiforgery();

        group.MapDelete("{id}",
        async (Guid id, ISender sender, CancellationToken cancellationToken) =>
        {
            var response = await sender.Send(new SliderDeleteCommand(id), cancellationToken);
            return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
        }).Produces<Result<string>>()
        .WithName("SliderDelete");
    }
}
