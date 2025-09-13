using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Brands;

public sealed class Brand : Entity
{
    public Name Name { get;private set; } = default!;
    public ICollection<Product> Products { get; set; }
}