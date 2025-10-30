using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using BCXConnectBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class MeetingController : ControllerBase
{
    private readonly ChatContext _context;
    private readonly InternalAIService _aiService;

    public MeetingController(ChatContext context, InternalAIService aiService)
    {
        _context = context;
        _aiService = aiService;
    }

    [HttpGet]
    public async Task<IEnumerable<MeetingTranscript>> GetAll()
    {
        return await _context.MeetingTranscripts.ToListAsync();
    }

    [HttpPost("summaries")]
    public async Task<ActionResult<string>> Summarize([FromBody] string transcript)
    {
        var summary = await _aiService.GenerateSummaryAsync(transcript);
        return Ok(summary);
    }
}
