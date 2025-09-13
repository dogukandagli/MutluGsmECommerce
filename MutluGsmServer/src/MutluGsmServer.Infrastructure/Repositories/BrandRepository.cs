using GenericRepository;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Repositories;

internal sealed class BrandRepository : Repository<Brand, ApplicationDbContext>, IBrandRepository
{
    public BrandRepository(ApplicationDbContext context) : base(context)
    {
    }
}
