using FluentValidation;
using GenericFileService.Files;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Commands.CreateProduct;

public sealed record ProductCreateCommand : IRequest<Result<string>>
{
    public string Name { get; init; } = default!;
    public int Quantity { get; init; }
    public decimal Price { get; init; }
    public decimal? OriginalPrice { get; init; }
    public int Condition { get; init; }
    public Guid CategoryId { get; init; }
    public Guid? BrandId { get; init; }
    public string? Description { get; init; }
    public bool Featured { get; init; }
    public int MainIndex { get; init; }
    public IFormFileCollection? File { get; init; }
}

public sealed class ProductCreateCommandValidator : AbstractValidator<ProductCreateCommand>
{
    public ProductCreateCommandValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Ürün ismi boş olamaz!");
        RuleFor(p => p.Quantity).GreaterThan(0).WithMessage("Stok 0 olamaz!");
        RuleFor(p => p.Price).GreaterThan(0).WithMessage("Geçerli bir değer giriniz!");
        RuleFor(p => p.Condition).GreaterThanOrEqualTo(0).WithMessage("Ürün durumu boş olamaz!");
        RuleFor(p => p.CategoryId).NotEmpty().WithMessage("Kategori boş olamaz!");
        RuleFor(p => p.File).NotEmpty().WithMessage("Ürün görseli yüklemelisiniz!");
        RuleFor(p => p.MainIndex).GreaterThanOrEqualTo(0).WithMessage("Lütfen bir tane ana resim seçiniz.");
    }
}

internal sealed class ProductCreateCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork) :
    IRequestHandler<ProductCreateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
        if (await productRepository.AnyAsync(p => p.Name.Value == request.Name, cancellationToken))
            return Result<string>.Failure("Bu isimde ürün var");


        Name name = new(request.Name);
        Quantity quantity = new(request.Quantity);
        ConditionEnum condition = ((ConditionEnum)request.Condition);
        List<ProductImage> productImages = new List<ProductImage>();

        for (int i = 0; i < request.File!.Count; i++)
        {
            var file = request.File[i];
            string fileName = FileService.FileSaveToServer(file, "wwwroot/images/");
            bool isMain = (i == request.MainIndex);
            ProductImage productImage = new(fileName, isMain);
            productImages.Add(productImage);
        }

        Product product = new(
            name,
            productImages,
            quantity,
            request.Price,
            request.OriginalPrice,
            condition,
            request.CategoryId,
            request.BrandId,
            request.Description,
            request.Featured);

        productRepository.Add(product);
        await unitOfWork.SaveChangesAsync();

        return "Ürün oluşturuldu";
    }
}