using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(p => p.Id);

        builder.OwnsOne(p => p.Name, nb =>
        {
            nb.Property(n => n.Value)
              .HasColumnName("Name")
              .IsRequired();
        });

        builder.OwnsOne(p => p.Quantity, nb =>
        {
            nb.Property(n => n.Value)
              .HasColumnName("Quantity")
              .IsRequired();
        });


        builder.Property(p => p.Price)
               .HasColumnType("Money")
               .IsRequired();
        builder.Property(p => p.OriginalPrice)
              .HasColumnType("Money");

        builder.Property(p => p.Condition)
            .HasConversion(con => con.Value, val => ConditionEnum.FromValue(val))
            .IsRequired();
        builder.Property(p => p.Description)
               .HasMaxLength(2000);

        builder.OwnsMany(p => p._images, img =>
        {
            img.ToTable("ProductImages");
            img.WithOwner().HasForeignKey("ProductId");

            img.Property<Guid>("Id");
            img.HasKey("Id");

            img.Property(i => i.imageUrl)
               .HasColumnName("ImageUrl")
               .HasMaxLength(500)
               .IsRequired();

            img.Property(i => i.isMain)
               .HasColumnName("IsMain")
               .IsRequired();
        }
        );

        builder.HasQueryFilter(x => !x.IsDeleted);

    }
}
