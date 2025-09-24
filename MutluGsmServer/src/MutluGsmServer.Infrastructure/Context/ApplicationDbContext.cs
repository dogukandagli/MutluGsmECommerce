using GenericRepository;
using Microsoft.EntityFrameworkCore;
using MutluGsmServer.Domain.Abstractions;
using MutluGsmServer.Domain.Brands;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Products;

namespace MutluGsmServer.Infrastructure.Context;

internal sealed class ApplicationDbContext : DbContext, IUnitOfWork
{

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Brand> Brands { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }


    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<Entity>();


        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property(p => p.CreatedDate)
                    .CurrentValue = DateTimeOffset.Now;

            }

            if (entry.State == EntityState.Modified)
            {
                if (entry.Property(p => p.IsDeleted).CurrentValue == true)
                {
                    entry.Property(p => p.DeletedDate)
                    .CurrentValue = DateTimeOffset.Now;
                }
                else
                {
                    entry.Property(p => p.UpdatedDate)
                        .CurrentValue = DateTimeOffset.Now;
                }
            }

            if (entry.State == EntityState.Deleted)
            {
                throw new ArgumentException("Db'den direkt silme işlemi yapamazsınız");
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }

}
