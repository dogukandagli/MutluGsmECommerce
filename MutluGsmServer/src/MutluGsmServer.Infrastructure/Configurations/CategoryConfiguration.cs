using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Categories;
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
        builder.HasKey(c => c.Id);
        builder.OwnsOne(i => i.Name, builder =>
            builder.Property(c => c.Value).HasColumnName("Name")
        );
    }
}
