using MutluGsmServer.Domain.Products;
using MutluGsmServer.Infrastructure.Abstractions;
using MutluGsmServer.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Repositories;

internal class ProductImageRepository : AuditableRepository<ProductImage, ApplicationDbContext>, IProductImageRepository
{
    public ProductImageRepository(ApplicationDbContext context) : base(context)
    {
    }
}
