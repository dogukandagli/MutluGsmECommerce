using GenericRepository;
using MutluGsmServer.Domain.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Domain.Products;

public interface IProductRepository : IAuditableRepository<Product>
{
}
