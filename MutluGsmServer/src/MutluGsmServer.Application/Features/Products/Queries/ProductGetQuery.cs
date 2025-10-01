using MediatR;
using Microsoft.EntityFrameworkCore;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Queries;

public sealed record ProductGetQuery(Guid Id) : IRequest<Result<ProductDto>>;

internal sealed class ProductGetQueryHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository,
        IBrandRepository brandRepository
    ) : IRequestHandler<ProductGetQuery, Result<ProductDto>>
{
    public async Task<Result<ProductDto>> Handle(ProductGetQuery request, CancellationToken cancellationToken)
    {
        var res = await productRepository
            .GetAllWithAudit()
            .MapTo(categoryRepository.GetAll(),
            brandRepository.GetAll())
            .Where(p => p.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (res is null)
        {
            return Result<ProductDto>.Failure("Ürün Bulunumadı");
        }
        return res;
    }
}