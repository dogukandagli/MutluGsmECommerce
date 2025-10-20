using MutluGsmServer.Domain.Abstractions;

namespace MutluGsmServer.Domain.Sliders;

public sealed class Slider : Entity
{
    private Slider() { }

    public Slider(string imageUrl)
    {
        setImageUrl(imageUrl);
    }

    public string ImageUrl { get; set; } = default!;

    public void setImageUrl(string imageUrl)
    {
        ImageUrl = imageUrl;
    }
}
