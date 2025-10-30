using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ApprovalsController : ControllerBase
{
    private readonly ChatContext _context;

    public ApprovalsController(ChatContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Approval>> GetApprovals()
    {
        return await _context.Approvals.Include(a => a.Requester).Include(a => a.Approver).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Approval>> Create(Approval approval)
    {
        approval.RequestedAt = DateTime.UtcNow;
        _context.Approvals.Add(approval);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetApprovals), new { id = approval.Id }, approval);
    }
}
