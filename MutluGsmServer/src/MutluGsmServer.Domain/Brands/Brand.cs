using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Brands;

public sealed class Brand : Entity
{
    private Brand() { }
    public Brand(Name name)
    {
        SetName(name);
    }
    public Name Name { get; private set; } = default!;
    public ICollection<Product>? Products { get; set; }

    public void SetName(Name name)
    {
        Name = name;
    }
}