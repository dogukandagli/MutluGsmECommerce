using GenericRepository;
using MediatR;
using MutluGsmServer.Domain.Sliders;
using TS.Result;

namespace MutluGsmServer.Application.Features.Sliders;

public sealed record SliderDeleteCommand(Guid Id) : IRequest<Result<string>>;

internal sealed class SliderDeleteCommandHandler(
    ISliderRepository sliderRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<SliderDeleteCommand, Result<string>>
{
    public async Task<Result<string>> Handle(SliderDeleteCommand request, CancellationToken cancellationToken)
    {
        Slider slider = await sliderRepository.FirstOrDefaultAsync(s => s.Id == request.Id);

        if (slider is null)
        {
            return Result<String>.Failure("Slider bulunumadı veya silindi!");
        }

        slider.Delete();
        sliderRepository.Update(slider);

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Slider silindi";

    }
}