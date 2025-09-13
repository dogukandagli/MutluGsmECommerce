using Ardalis.SmartEnum;

namespace MutluGsmServer.Domain.Products;

public sealed class ConditionEnum : SmartEnum<ConditionEnum>
{
    public static ConditionEnum SifirinciEl = new("Sıfır", 0);
    public static ConditionEnum IkinciEl = new("İkinci El", 1);
    public ConditionEnum(string name, int value) : base(name, value)
    {
    }
}