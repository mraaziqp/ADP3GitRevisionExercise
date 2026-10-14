namespace BCXConnectBackend.Services;

public class InternalAIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public InternalAIService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GenerateSummaryAsync(string input, CancellationToken cancellationToken = default)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, _configuration["InternalAI:Url"])
        {
            Content = new StringContent(input)
        };
        request.Headers.Add("X-API-Key", _configuration["InternalAI:ApiKey"] ?? string.Empty);
        var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync(cancellationToken);
    }
}
