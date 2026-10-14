using BCXConnectBackend.Models;
using BCXConnectBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class KnowledgeController : ControllerBase
{
    private readonly KnowledgeService _knowledgeService;

    public KnowledgeController(KnowledgeService knowledgeService)
    {
        _knowledgeService = knowledgeService;
    }

    [HttpGet]
    public async Task<IEnumerable<KnowledgeItem>> Search([FromQuery] string term)
    {
        return await _knowledgeService.SearchAsync(term);
    }

    [HttpPost]
    public async Task<ActionResult<KnowledgeItem>> Create(KnowledgeItem item)
    {
        var created = await _knowledgeService.CreateAsync(item);
        return CreatedAtAction(nameof(Search), new { term = created.Title }, created);
    }
}
