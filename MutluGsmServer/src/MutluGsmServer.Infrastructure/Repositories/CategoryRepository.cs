using GenericRepository;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Infrastructure.Abstractions;
using MutluGsmServer.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Repositories;

internal sealed class CategoryRepository : AuditableRepository<Category, ApplicationDbContext>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
    }
}
