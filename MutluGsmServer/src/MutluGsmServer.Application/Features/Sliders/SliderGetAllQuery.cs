using MediatR;
using MutluGsmServer.Domain.Sliders;

namespace MutluGsmServer.Application.Features.Sliders;

public sealed record SliderGetAllQuery : IRequest<IQueryable<Slider>>;

internal sealed class SliderGetAllQueryHandler(ISliderRepository sliderRepository) : IRequestHandler<SliderGetAllQuery, IQueryable<Slider>>
{
    public Task<IQueryable<Slider>> Handle(SliderGetAllQuery request, CancellationToken cancellationToken)
    {
        var res = sliderRepository.AsQueryable();
        return Task.FromResult(res);
    }
}