using FluentValidation;
using GenericFileService.Files;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Commands.UpdateProduct;

public sealed record ProductUpdateCommand : IRequest<Result<string>>
{
    public Guid Id { get; set; }
    public string Name { get; init; } = default!;
    public int Quantity { get; init; }
    public decimal Price { get; init; }
    public decimal? OriginalPrice { get; init; }
    public int Condition { get; init; }
    public Guid CategoryId { get; init; }
    public Guid? BrandId { get; init; }
    public string? Description { get; init; }
    public bool Featured { get; init; }
    public IFormFileCollection? File { get; init; }
    public bool IsActive { get; init; }
}

public sealed class ProductUpdateCommandValidator : AbstractValidator<ProductUpdateCommand>
{
    public ProductUpdateCommandValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Ürün ismi boş olamaz!");
        RuleFor(p => p.Quantity).GreaterThan(0).WithMessage("Stok 0 olamaz!");
        RuleFor(p => p.Price).GreaterThan(0).WithMessage("Geçerli bir değer giriniz!");
        RuleFor(p => p.Condition).GreaterThanOrEqualTo(0).WithMessage("Ürün durumu boş olamaz!");
        RuleFor(p => p.CategoryId).NotEmpty().WithMessage("Kategori boş olamaz!");
        RuleFor(p => p.File).NotEmpty().WithMessage("Ürün görseli yüklemelisiniz!");
    }
}

internal sealed class ProductUpdateCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<ProductUpdateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ProductUpdateCommand request, CancellationToken cancellationToken)
    {
        Product? product = await productRepository.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (product == null)
        {
            return Result<string>.Failure("Ürün bulunumadı");
        }

        if (request.File?.Count() == 0)
        {
            return Result<string>.Failure("Ana resim olmak zorunda!");
        }


        Name name = new(request.Name);
        Quantity quantity = new(request.Quantity);
        ConditionEnum condition = ConditionEnum.FromValue(request.Condition);

        foreach (var img in product._images.ToList())
        {
            product.RemoveImage(img.Id);
        }


        product.SetName(name);
        product.SetQuantity(quantity);
        product.SetCondition(condition);
        product.SetCategoryId(request.CategoryId);
        if (request.BrandId is not null)
        {
            product.SetBrandId(request.BrandId);
        }
        if (request.Description is not null)
        {
            product.SetDescription(request.Description);
        }
        product.SetPrice(request.Price);
        if (request.OriginalPrice is not null)
        {
            product.SetOriginalPrice(request.OriginalPrice);
        }
        product.SetFeatured(request.Featured);
        product.SetStatus(request.IsActive);


        for (int i = 0; i < request.File?.Count; i++)
        {
            var file = request.File[i];
            string fileName = FileService.FileSaveToServer(file, "wwwroot/images/");
            bool isMain = (i == 0);                      // burada ana resmi belirliyoruz
            product.AddImage(fileName, isMain);          // AddImage yeni nesneyi Added durumuna sokmalı
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Ürün başarıyla güncellendi";

    }
}