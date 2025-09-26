using MutluGsmServer.Domain.User;

namespace MutluGsmServer.Application.Services;

public interface IJwtProvider
{
    public Task<string> CreateTokenAsync(AppUser user, CancellationToken cancellationToken = default);

}
