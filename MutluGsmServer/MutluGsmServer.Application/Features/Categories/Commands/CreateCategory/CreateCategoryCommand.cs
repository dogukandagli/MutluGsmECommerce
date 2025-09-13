using FluentValidation;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using MutluGsmServer.Domain.Categories;
using MutluGsmServer.Domain.Shared;
using TS.Result;

namespace MutluGsmServer.Application.Features.Categories.Commands.CreateCategory;

public sealed record CreateCategoryCommand(string name) : IRequest<Result<string>>;

public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(c => c.name)
            .NotEmpty().WithMessage("Kategori adı boş olamaz")
            .MaximumLength(100).WithMessage("Kategori adı en fazla 100 karakter olabilir");
    }
}

internal sealed class CreateCategoryCommandHandler(
    ICategoryRepository categoryRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<CreateCategoryCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var nameExists =await categoryRepository.AnyAsync(c=>c.Name.Value == request.name, cancellationToken);

        if (nameExists)
        {
            return Result<string>.Failure("Kategori adı zaten mevcut");
        }

        Name name= new(request.name);
        Category category = new(name);
        categoryRepository.Add(category);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Kategori başarıyla oluşturuldu";
    }
}