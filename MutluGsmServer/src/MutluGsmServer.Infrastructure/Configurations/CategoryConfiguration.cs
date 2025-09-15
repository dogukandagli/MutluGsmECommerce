using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(x => x.Id);
        builder.OwnsOne(p => p.Name, nb =>
        {
            nb.Property(n => n.Value)
              .HasColumnName("Name")
              .IsRequired();
        });
    }
}
