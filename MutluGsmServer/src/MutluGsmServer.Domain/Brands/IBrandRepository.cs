using GenericRepository;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;

namespace MutluGsmServer.Domain.Brands;

public interface IBrandRepository : IAuditableRepository<Brand>
{
}
