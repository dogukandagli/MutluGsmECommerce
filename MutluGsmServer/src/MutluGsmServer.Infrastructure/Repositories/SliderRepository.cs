using MutluGsmServer.Domain.Sliders;
using MutluGsmServer.Infrastructure.Abstractions;
using MutluGsmServer.Infrastructure.Context;

namespace MutluGsmServer.Infrastructure.Repositories;

internal class SliderRepository : AuditableRepository<Slider, ApplicationDbContext>, ISliderRepository
{
    public SliderRepository(ApplicationDbContext context) : base(context)
    {
    }
}
