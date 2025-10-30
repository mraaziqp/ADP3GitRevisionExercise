using BCXConnectBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace BCXConnectBackend.Controllers;

[Authorize]
public class ChatHub : Hub
{
    private readonly ChatService _chatService;

    public ChatHub(ChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task SendMessage(string content, string channel)
    {
        var userId = Context.User?.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (int.TryParse(userId, out var id))
        {
            var message = await _chatService.AddMessageAsync(id, content, channel);
            await Clients.Group(channel).SendAsync("ReceiveMessage", new
            {
                message.Id,
                message.Content,
                message.Timestamp,
                Sender = Context.User?.Identity?.Name,
                message.Channel
            });
        }
    }

    public Task JoinChannel(string channel)
    {
        return Groups.AddToGroupAsync(Context.ConnectionId, channel);
    }

    public Task LeaveChannel(string channel)
    {
        return Groups.RemoveFromGroupAsync(Context.ConnectionId, channel);
    }
}
