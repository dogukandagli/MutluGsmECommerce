using MediatR;
using MutluGsmServer.Application.Features.Categories.Queries.GetAllCategory;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TS.Result;

namespace MutluGsmServer.Application.Features.Brands.Queries.GetAllBrand;

public sealed record BrandGetAllQuery : IRequest<IQueryable<BrandGetAllQueryResponse>>;

public sealed class BrandGetAllQueryResponse : EntityDto
{
    public string Name { get; set; } = null!;
}

internal sealed class BrandGetAllQueryHandler(IBrandRepository brandRepository ) : IRequestHandler<BrandGetAllQuery, IQueryable<BrandGetAllQueryResponse>>
{
    public Task<IQueryable<BrandGetAllQueryResponse>> Handle(BrandGetAllQuery request, CancellationToken cancellationToken)
    {
        var response = brandRepository.GetAll()
            .Select(x => new BrandGetAllQueryResponse
            {
                CreatedDate = x.CreatedDate,
                DeletedDate = x.DeletedDate,
                Id = x.Id,
                IsActive = x.IsActive,
                IsDeleted = x.IsDeleted,
                Name = x.Name.Value,
                 UpdatedDate = x.UpdatedDate
                  
            }).AsQueryable();
        return Task.FromResult(response);
    }
}