namespace BCXConnectBackend.Models;

public class KnowledgeItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public int CreatedById { get; set; }
    public User? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
