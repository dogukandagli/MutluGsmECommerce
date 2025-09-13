using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Domain.Abstractions;

public abstract class Entity
{
    public Entity()
    {
        Id = Guid.CreateVersion7();
    }
    public Guid Id { get; set; }

    #region Audit Log
    public DateTimeOffset CreatedDate { get; set; } 
    public DateTimeOffset? UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedDate { get; set; }

    #endregion

}