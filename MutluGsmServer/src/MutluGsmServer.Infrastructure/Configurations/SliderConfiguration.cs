using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MutluGsmServer.Domain.Sliders;

namespace MutluGsmServer.Infrastructure.Configurations;

internal sealed class SliderConfiguration : IEntityTypeConfiguration<Slider>
{
    public void Configure(EntityTypeBuilder<Slider> builder)
    {
        builder.ToTable("Sliders");
        builder.HasKey(p => p.Id);

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
