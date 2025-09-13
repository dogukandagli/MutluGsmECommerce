using FluentValidation;
using GenericRepository;
using MediatR;
using MutluGsmServer.Application.Features.Categories.Commands.CreateCategory;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Commands.CreateProduct;

public sealed record ProductCreateCommand(string Name, 
    int Quantity,
    decimal Price,
    decimal? OriginalPrice,
    int Condition,
    Guid CategoryId,
    Guid? brandId,
    string? Description, bool featured): IRequest<Result<string>>;

public sealed class ProductCreateCommandValidator : AbstractValidator<ProductCreateCommand>
{
    public ProductCreateCommandValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Ürün ismi boş olamaz!");
        RuleFor(p => p.Quantity).GreaterThan(0).WithMessage("Stok 0 olamaz!");
        RuleFor(p => p.Price).GreaterThan(0).WithMessage("Geçerli bir değer giriniz!");
        RuleFor(p => p.Condition).NotEmpty().WithMessage("Ürün durumu boş olamaz!");
        RuleFor(p => p.CategoryId).NotEmpty().WithMessage("Kategori boş olamaz!");
    }
}

internal sealed class ProductCreateCommandHandler(IProductRepository productRepository,IUnitOfWork unitOfWork) :
    IRequestHandler<ProductCreateCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
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