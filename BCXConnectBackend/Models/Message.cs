namespace BCXConnectBackend.Models;

public class Message
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public int SenderId { get; set; }
    public User? Sender { get; set; }
    public bool IsSystem { get; set; }
    public string Channel { get; set; } = "general";
}
