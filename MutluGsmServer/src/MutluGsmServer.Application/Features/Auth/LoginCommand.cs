using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MutluGsmServer.Application.Services;
using MutluGsmServer.Domain.User;
using TS.Result;

namespace MutluGsmServer.Application.Features.Auth;

public sealed record LoginCommand(string UserNameorEmail,
    string Password) : IRequest<Result<LoginCommandResponse>>;

public sealed record LoginCommandResponse
{
    public string AccessToken { get; set; } = default!;
}
internal sealed class LoginCommandHandler(
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    IJwtProvider jwtProvider) : IRequestHandler<LoginCommand, Result<LoginCommandResponse>>
{
    public async Task<Result<LoginCommandResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await userManager.Users.
            FirstOrDefaultAsync(p => p.Email == request.UserNameorEmail || p.UserName == request.UserNameorEmail, cancellationToken);

        if (user is null)
        {
            return Result<LoginCommandResponse>.Failure("Kullanıcı bulunamadı!");
        }

        SignInResult signInResult = await signInManager.CheckPasswordSignInAsync(user, request.Password, true);

        if (signInResult.IsLockedOut)
        {

            TimeSpan? timeSpan = user.LockoutEnd - DateTime.UtcNow;
            if (timeSpan is not null)
            {
                return (500, $"Şifrenizi 5 defa yanlış girdiğiniz için kullanıcı " +
                    $"{Math.Ceiling(timeSpan.Value.TotalMinutes)} dakika süreyle bloke edilmiştir");
            }
        }

        if (signInResult.IsNotAllowed)
        {
            return (500, "Mail adresiniz onayli değil");
        }
        if (!signInResult.Succeeded)
        {
            return (500, "Şifreniz yanlış");
        }

        //token uret 
        var token = await jwtProvider.CreateTokenAsync(user, cancellationToken);

        var response = new LoginCommandResponse()
        {
            AccessToken = token
        };

        return response;

    }
}