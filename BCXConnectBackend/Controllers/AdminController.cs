using BCXConnectBackend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Authorize(Roles = "Administrator")]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ChatContext _context;

    public AdminController(ChatContext context)
    {
        _context = context;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.OrderBy(u => u.Username).ToListAsync();
        return Ok(users);
    }
}
