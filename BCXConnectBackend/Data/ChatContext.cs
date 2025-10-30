using BCXConnectBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Data;

public class ChatContext : DbContext
{
    public ChatContext(DbContextOptions<ChatContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<Approval> Approvals => Set<Approval>();
    public DbSet<KnowledgeItem> KnowledgeItems => Set<KnowledgeItem>();
    public DbSet<MeetingTranscript> MeetingTranscripts => Set<MeetingTranscript>();
    public DbSet<CodeFixRecord> CodeFixRecords => Set<CodeFixRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany(u => u.Messages)
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Approval>()
            .HasOne(a => a.Requester)
            .WithMany(u => u.Approvals)
            .HasForeignKey(a => a.RequesterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Approval>()
            .HasOne(a => a.Approver)
            .WithMany()
            .HasForeignKey(a => a.ApproverId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
