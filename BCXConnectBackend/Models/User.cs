namespace BCXConnectBackend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime LastLogin { get; set; }
    public ICollection<Message> Messages { get; set; } = new List<Message>();
    public ICollection<Approval> Approvals { get; set; } = new List<Approval>();
}
