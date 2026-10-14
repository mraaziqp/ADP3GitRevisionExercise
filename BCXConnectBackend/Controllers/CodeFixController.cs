using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CodeFixController : ControllerBase
{
    private readonly ChatContext _context;

    public CodeFixController(ChatContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<CodeFixRecord>> GetAll()
    {
        return await _context.CodeFixRecords.Include(c => c.RequestedBy).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<CodeFixRecord>> Create(CodeFixRecord record)
    {
        record.CreatedAt = DateTime.UtcNow;
        _context.CodeFixRecords.Add(record);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = record.Id }, record);
    }
}
