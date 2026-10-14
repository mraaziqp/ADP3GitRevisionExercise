using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Services;

public class ChatService
{
    private readonly ChatContext _context;

    public ChatService(ChatContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Message>> GetRecentMessagesAsync(string channel, int count = 50)
    {
        return await _context.Messages
            .Where(m => m.Channel == channel)
            .OrderByDescending(m => m.Timestamp)
            .Take(count)
            .Include(m => m.Sender)
            .ToListAsync();
    }

    public async Task<Message> AddMessageAsync(int senderId, string content, string channel)
    {
        var message = new Message
        {
            SenderId = senderId,
            Content = content,
            Channel = channel,
            Timestamp = DateTime.UtcNow
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();
        return message;
    }
}
