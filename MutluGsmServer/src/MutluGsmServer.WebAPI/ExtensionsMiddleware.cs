using Microsoft.AspNetCore.Identity;
using MutluGsmServer.Domain.User;

namespace MutluGsmServer.WebAPI;

public class ExtensionsMiddleware
{
    public static void CreateFirstUser(WebApplication app)
    {
        using (var scoped = app.Services.CreateScope())
        {
            var userManager = scoped.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

            if (!userManager.Users.Any(p => p.UserName == "admin"))
            {
                AppUser user = new()
                {
                    UserName = "admin",
                    Email = "admin@admin.com",
                    FirstName = "Doğukan",
                    LastName = "Dağlı",
                    EmailConfirmed = true,
                    CreatedDate = DateTimeOffset.Now
                };

                userManager.CreateAsync(user, "1234").Wait();
            }
        }
    }
}
