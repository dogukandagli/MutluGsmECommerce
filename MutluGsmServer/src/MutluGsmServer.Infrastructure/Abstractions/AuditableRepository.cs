using GenericRepository;
using Microsoft.EntityFrameworkCore;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MutluGsmServer.Infrastructure.Abstractions;

internal class AuditableRepository<TEntity, TContext> : Repository<TEntity, TContext>, IAuditableRepository<TEntity>
    where TEntity : Entity
    where TContext : DbContext
{
    private readonly TContext _context;
    public AuditableRepository(TContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<EntityWithAuditDto<TEntity>> GetAllWithAudit()
    {

        var entities = _context.Set<TEntity>().AsQueryable();

        var res = entities.Select(e => new EntityWithAuditDto<TEntity>
        {
            Entity = e
        });

        return res;
    }
}
