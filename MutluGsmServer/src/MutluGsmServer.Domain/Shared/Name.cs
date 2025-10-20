namespace MutluGsmServer.Domain.Shared;

public sealed record Name
{
    private Name() { }
    public string Value { get; set; } = default!;
    public Name(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("İsim alanı boş olamaz");

        if (value.Length < 2 || value.Length > 100)
            throw new ArgumentException("İsim alanı 2 ile 100 karakter arasında olmalıdır");

        Value = value;
    }
}