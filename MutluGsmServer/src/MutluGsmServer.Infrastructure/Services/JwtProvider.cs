using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MutluGsmServer.Application.Services;
using MutluGsmServer.Domain.User;
using MutluGsmServer.Infrastructure.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MutluGsmServer.Infrastructure.Services;

internal sealed class JwtProvider(
    IOptions<JwtOptions> options
    ) : IJwtProvider
{

    public Task<string> CreateTokenAsync(AppUser user, CancellationToken cancellationToken = default)
    {

        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Name, user.UserName!),
        };

        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(options.Value.SecretKey));
        SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha512);

        var expires = DateTime.Now.AddDays(1);

        JwtSecurityToken securityToken = new(
          issuer: options.Value.Issuer,
          audience: options.Value.Audience,
          claims: claims,
          notBefore: DateTime.Now,
          expires: expires,
          signingCredentials: signingCredentials);

        JwtSecurityTokenHandler handler = new();
        string token = handler.WriteToken(securityToken);


        return Task.FromResult(token);
    }
}