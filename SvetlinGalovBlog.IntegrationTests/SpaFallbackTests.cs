using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace SvetlinGalovBlog.IntegrationTests;

public class SpaFallbackTests : IClassFixture<SpaWebApplicationFactory>
{
    private readonly SpaWebApplicationFactory _factory;

    public SpaFallbackTests(SpaWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetRandomSpaPath_Returns200_WithHtmlContent()
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false,
        });

        var response = await client.GetAsync("/random/spa/path/that/does/not/exist");

        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("<div id=\"root\">", content);
    }

    [Fact]
    public async Task WeatherForecastEndpoint_IsRemoved_ReturnsSpaFallback()
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false,
        });

        var response = await client.GetAsync("/weatherforecast");

        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("<div id=\"root\">", content);
    }
}

public class SpaWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var wwwrootPath = Path.Combine(AppContext.BaseDirectory, "wwwroot");

        builder.UseSetting("webroot", wwwrootPath);
    }
}
