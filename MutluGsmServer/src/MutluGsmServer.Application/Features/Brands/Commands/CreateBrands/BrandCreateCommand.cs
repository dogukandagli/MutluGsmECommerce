using FluentValidation;
using GenericRepository;
using MediatR;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Shared;
using TS.Result;

namespace MutluGsmServer.Application.Features.Brands.Commands.CreateBrands;

public sealed record BrandCreateCommand(string name) : IRequest<Result<string>>;

public sealed class BrandCreateCommandValidator : AbstractValidator<BrandCreateCommand>
{
    public BrandCreateCommandValidator()
    {
        RuleFor(c => c.name)
           .NotEmpty().WithMessage("Kategori adı boş olamaz")
           .MaximumLength(100).WithMessage("Kategori adı en fazla 100 karakter olabilir");
    }
}
internal sealed class BrandCreateCommandHandler(IBrandRepository brandRepository ,
    IUnitOfWork unitOfWork) : IRequestHandler<BrandCreateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(BrandCreateCommand request, CancellationToken cancellationToken)
    {

        var nameExists =await brandRepository.AnyAsync(b=>b.Name.Value == request.name, cancellationToken);

        if (nameExists)
        {
            return Result<string>.Failure("Marki adı zaten mevcut");
        }
        Name name = new(request.name);
        Brand brand = new(name);
        brandRepository.Add(brand);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Marka başarıyla oluşturuldu";
    }
}