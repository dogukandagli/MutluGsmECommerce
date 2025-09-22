using GenericRepository;
using MediatR;
using MutluGsmServer.Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TS.Result;

namespace MutluGsmServer.Application.Features.Products.Commands.ProductDelete;

public sealed record ProductDeleteCommand(
    Guid Id
    ) : IRequest<Result<string>>;

internal sealed class ProductDeleteCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<ProductDeleteCommand, Result<string>>
{
    public async Task<Result<string>> Handle(ProductDeleteCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.FirstOrDefaultAsync(p=>p.Id == request.Id, cancellationToken);

        if (product == null)
        {
            return Result<string>.Failure("Ürün bulunumadı veya silindi!");
        }
        product.Delete();
        productRepository.Update(product);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Ürün silindi";
    }
}