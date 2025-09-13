using MediatR;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Application.Features.Products.Queries.GetAllProduct;

public sealed record ProductGetAllQuery : IRequest<IQueryable<ProductDto>>;

internal sealed class ProductGetAllQueryHandler(
    IProductRepository productRepository,
    ICategoryRepository categoryRepository,
    IBrandRepository brandRepository) : IRequestHandler<ProductGetAllQuery, IQueryable<ProductDto>>
{
    public Task<IQueryable<ProductDto>> Handle(ProductGetAllQuery request, CancellationToken cancellationToken)
    {
       return Task.FromResult(productRepository.GetAllWithAudit().MapTo(categoryRepository.GetAll(),brandRepository.GetAll())
            .AsQueryable());
    }
}

