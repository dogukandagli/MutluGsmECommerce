using GenericRepository;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Domain.Categories;

public interface ICategoryRepository : IAuditableRepository<Category>
{
}
