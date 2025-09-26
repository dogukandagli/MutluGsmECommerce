namespace MutluGsmServer.WebAPI.Modules;

public static class RouteRegistrar
{
    public static void RegisterRoutes(this IEndpointRouteBuilder app)
    {
        app.RegisterCategoryRoutes();
        app.RegisterProductRoutes();
        app.RegisterBrandRoutes();
        app.RegisterAuthRoutes();
    }
}
