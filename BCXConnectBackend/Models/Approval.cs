namespace BCXConnectBackend.Models;

public class Approval
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string Status { get; set; } = "Pending";
    public int RequesterId { get; set; }
    public User? Requester { get; set; }
    public int? ApproverId { get; set; }
    public User? Approver { get; set; }
}
