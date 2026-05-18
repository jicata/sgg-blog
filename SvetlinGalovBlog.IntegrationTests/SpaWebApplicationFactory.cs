using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace SvetlinGalovBlog.IntegrationTests;

public class SpaWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var wwwrootPath = Path.Combine(AppContext.BaseDirectory, "wwwroot");

        builder.UseSetting("webroot", wwwrootPath);
    }
}
