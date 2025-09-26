using Microsoft.AspNetCore.Identity;

namespace MutluGsmServer.Domain.User;

public sealed class AppUser : IdentityUser<Guid>
{
    public AppUser()
    {
        Id = Guid.CreateVersion7();

    }

    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;

    public string FullName => $"{FullName} {LastName}";

    #region Audit Log
    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedDate { get; set; }

    #endregion
}
