using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.RateLimiting;
using MutluGsmServer.Application;
using MutluGsmServer.Infrastructure;
using MutluGsmServer.WebAPI.Controllers;
using MutluGsmServer.WebAPI.Modules;
using Scalar.AspNetCore;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddCors();
builder.Services.AddOpenApi();
builder.Services.AddControllers().AddOData(opt =>
            opt.Select()
                .Filter()
                .Count()
                .Expand()
                .OrderBy()
                .SetMaxTop(null)
                .AddRouteComponents("odata", MainODataController.GetEdmModel()));
builder.Services.AddRateLimiter(options =>
options.AddFixedWindowLimiter("fixed", opt =>
{
    opt.PermitLimit = 100;
    opt.Window = TimeSpan.FromMinutes(1);
    opt.QueueProcessingOrder =QueueProcessingOrder.OldestFirst;
    opt.QueueLimit = 100;
})
);

var app = builder.Build();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseCors(policy => policy
.AllowAnyHeader()
.AllowCredentials()
.AllowAnyMethod()
.SetIsOriginAllowed(t=>true));

app.RegisterRoutes();

app.MapControllers().RequireRateLimiting("fixed");
app.Run();
