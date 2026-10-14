namespace BCXConnectBackend.Models;

public class CodeFixRecord
{
    public int Id { get; set; }
    public string Repository { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }
    public int RequestedById { get; set; }
    public User? RequestedBy { get; set; }
    public string? Diff { get; set; }
}
