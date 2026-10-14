using BCXConnectBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Services;

public class AnalyticsService
{
    private readonly ChatContext _context;

    public AnalyticsService(ChatContext context)
    {
        _context = context;
    }

    public async Task<int> GetActiveUsersAsync()
    {
        var since = DateTime.UtcNow.AddDays(-7);
        return await _context.Users.CountAsync(u => u.LastLogin >= since);
    }

    public async Task<int> GetMessageCountAsync()
    {
        var since = DateTime.UtcNow.AddDays(-7);
        return await _context.Messages.CountAsync(m => m.Timestamp >= since);
    }
}
