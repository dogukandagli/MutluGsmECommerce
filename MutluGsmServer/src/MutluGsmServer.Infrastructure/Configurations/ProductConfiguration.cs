using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Products;
using MutluGsmServer.Domain.Products.ValueObjects;
using MutluGsmServer.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
              .HasConversion(v => v.Value, v => new Name(v))
              .HasMaxLength(200)
              .IsRequired();

        builder.Property(p => p.Quantity)
               .HasConversion(v => v.Value, v => new Quantity(v))
               .IsRequired();

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


    }
}
