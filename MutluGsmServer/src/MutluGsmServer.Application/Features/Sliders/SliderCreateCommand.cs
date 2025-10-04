using FluentValidation;
using GenericFileService.Files;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using MutluGsmServer.Domain.Sliders;
using TS.Result;

namespace MutluGsmServer.Application.Features.Sliders;

public sealed record SliderCreateCommand : IRequest<Result<string>>
{
    public IFormFileCollection? File { get; init; }
};

public sealed class SliderCreateCommandValidator : AbstractValidator<SliderCreateCommand>
{
    public SliderCreateCommandValidator()
    {
        RuleFor(s => s.File)
            .NotEmpty()
            .WithMessage("Slider görseli yüklemelisiniz.");
    }
}

internal sealed class SliderCreateCommandHandler(
    ISliderRepository sliderRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<SliderCreateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(SliderCreateCommand request, CancellationToken cancellationToken)
    {
        foreach (var file in request.File!)
        {
            string fileName = FileService.FileSaveToServer(file, "wwwroot/images/");
            Slider slider = new Slider(fileName);
            sliderRepository.Add(slider);
        }


        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Slider Başarıyla oluşturuldu.";
    }
}