using BCXConnectBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _analyticsService;

    public AnalyticsController(AnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("overview")]
    public async Task<ActionResult<object>> Overview()
    {
        var activeUsers = await _analyticsService.GetActiveUsersAsync();
        var messageCount = await _analyticsService.GetMessageCountAsync();
        return Ok(new { activeUsers, messageCount });
    }
}
