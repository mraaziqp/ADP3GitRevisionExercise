namespace BCXConnectBackend.Models;

public class MeetingTranscript
{
    public int Id { get; set; }
    public string MeetingTitle { get; set; } = string.Empty;
    public DateTime MeetingDate { get; set; }
    public string Transcript { get; set; } = string.Empty;
    public ICollection<User> Participants { get; set; } = new List<User>();
}
