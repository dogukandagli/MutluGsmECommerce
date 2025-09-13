using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Shared;

namespace MutluGsmServer.Domain.Categories;

public sealed class Category: Entity
{
    private Category() { }
    public Category(Name name)
    {
        SetName(name);
    }

    public Name Name { get; private set; }

    public ICollection<Product> Products { get;private set; }

    public void SetName(Name name)
    {
        Name = name;
    }
}
