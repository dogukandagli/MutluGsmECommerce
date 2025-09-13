using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Categories;

public sealed class Category: Entity
{
    public Category(string name)
    {
        SetName(name);
    }

    public Name Name { get; private set; }

    public ICollection<Product> Products { get;private set; }

    public void SetName(string name)
    {
        Name = new(name);
    }
}
