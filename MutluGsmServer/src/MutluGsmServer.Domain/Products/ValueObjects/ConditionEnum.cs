using System.ComponentModel.DataAnnotations;

namespace MutluGsmServer.Domain.Products.ValueObjects;

public enum ConditionEnum
{
    [Display(Name = "Sıfır")]
    SifirinciEl = 0,
    [Display(Name = "İkinci El")]
    IkinciEl = 1
}