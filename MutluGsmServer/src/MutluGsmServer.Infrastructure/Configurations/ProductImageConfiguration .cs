using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Products;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("ProductImages");

        builder.HasKey(pi => pi.Id);

        builder.Property(pi => pi.ImageUrl)
               .HasMaxLength(1000)
               .IsRequired();

        builder.Property(pi => pi.IsMain)
               .IsRequired();

        builder.Property(pi => pi.ProductId)
               .IsRequired();

        builder.HasIndex(pi => new { pi.ProductId, pi.ImageUrl })
               .IsUnique();

        builder.HasQueryFilter(x => !x.IsDeleted);

    }
}
