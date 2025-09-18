using FluentValidation;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Http;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Commands.CreateProduct;

public sealed record ProductCreateCommand(
    string Name, 
    int Quantity,
    decimal Price,
    decimal? OriginalPrice,
    int Condition,
    Guid CategoryId,
    Guid? brandId,
    string? Description, 
    bool featured,
    List<IFormFile> File,
    int MainIndex
    ): IRequest<Result<string>>;

public sealed class ProductCreateCommandValidator : AbstractValidator<ProductCreateCommand>
{
    public ProductCreateCommandValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Ürün ismi boş olamaz!");
        RuleFor(p => p.Quantity).GreaterThan(0).WithMessage("Stok 0 olamaz!");
        RuleFor(p => p.Price).GreaterThan(0).WithMessage("Geçerli bir değer giriniz!");
        RuleFor(p => p.Condition).NotEmpty().WithMessage("Ürün durumu boş olamaz!");
        RuleFor(p => p.CategoryId).NotEmpty().WithMessage("Kategori boş olamaz!");
        RuleFor(p => p.File).NotEmpty().WithMessage("Ürün görseli yüklemelisiniz!");
        RuleFor(p => p.MainIndex).GreaterThanOrEqualTo(0).WithMessage("Lütfen ana resimi işaretleyiniz.");
    }
}

internal sealed class ProductCreateCommandHandler(IProductRepository productRepository,IUnitOfWork unitOfWork) :
    IRequestHandler<ProductCreateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
        if (await productRepository.AnyAsync(p => p.Name.Value == request.Name, cancellationToken))
            return Result<string>.Failure("Bu isimde ürün var");

        Name name = new(request.Name);
        Quantity quantity = new(request.Quantity);
        ConditionEnum condition = ConditionEnum.FromValue(request.Condition);

        Product product = new(name,
            quantity, request.Price,
            request.OriginalPrice,
            condition, request.CategoryId,
            request.brandId,
            request.Description,
            request.featured);


        productRepository.Add(product);
        await unitOfWork.SaveChangesAsync();

        return "Ürün oluşturuldu";
    }
}