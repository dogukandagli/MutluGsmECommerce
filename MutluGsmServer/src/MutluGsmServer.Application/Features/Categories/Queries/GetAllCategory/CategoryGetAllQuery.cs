using MediatR;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Application.Features.Categories.Queries.GetAllCategory;

public sealed record class CategoryGetAllQuery : IRequest<IQueryable<CategoryGetAllQueryResponse>>;

public sealed class CategoryGetAllQueryResponse : EntityDto
{
    public string Name { get; set; } = null!;
}

public sealed class CategoryGetAllQueryHandler(ICategoryRepository categoryRepository) : IRequestHandler<CategoryGetAllQuery, IQueryable<CategoryGetAllQueryResponse>>
{
    public  Task<IQueryable<CategoryGetAllQueryResponse>> Handle(CategoryGetAllQuery request, CancellationToken cancellationToken)
    {
        var response = categoryRepository.GetAll()
            .Select(s=> new CategoryGetAllQueryResponse { 
                    Name = s.Name.Value,
                    CreatedDate = s.CreatedDate,
                    Id = s.Id,
                    IsActive = s.IsActive,
                    IsDeleted = s.IsDeleted,
                    DeletedDate = s.DeletedDate,
                    UpdatedDate = s.UpdatedDate
            });

        return Task.FromResult(response);
    }
}