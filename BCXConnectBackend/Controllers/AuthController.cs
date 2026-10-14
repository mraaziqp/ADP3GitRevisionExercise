using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using BCXConnectBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ChatContext _context;
    private readonly LdapAuthService _ldap;
    private readonly JwtService _jwt;

    public AuthController(ChatContext context, LdapAuthService ldap, JwtService jwt)
    {
        _context = context;
        _ldap = ldap;
        _jwt = jwt;
    }

    [HttpPost("login")]
    public async Task<ActionResult<object>> Login([FromBody] LoginRequest request)
    {
        if (!_ldap.ValidateCredentials(request.Username, request.Password))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user is null)
        {
            user = new User
            {
                Username = request.Username,
                DisplayName = request.Username,
                Email = $"{request.Username}@bcx.local",
                Department = "Unknown",
                Role = "User",
                LastLogin = DateTime.UtcNow
            };
            _context.Users.Add(user);
        }
        else
        {
            user.LastLogin = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();

        var token = _jwt.GenerateToken(user);
        return Ok(new { token, user.DisplayName, user.Role });
    }

    public record LoginRequest(string Username, string Password);
}
