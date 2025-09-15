using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class BrandConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.ToTable("Brands");
        builder.HasKey(b => b.Id);
        builder.OwnsOne(p => p.Name, nb =>
        {
            nb.Property(n => n.Value)
              .HasColumnName("Name")
              .IsRequired();
        });
    }
}
