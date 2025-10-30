using BCXConnectBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Data;

public static class SeedData
{
    public static async Task InitializeAsync(ChatContext context)
    {
        await context.Database.MigrateAsync();

        if (!context.Users.Any())
        {
            var users = new List<User>
            {
                new() { Username = "admin", DisplayName = "System Admin", Email = "admin@bcx.local", Department = "IT", Role = "Administrator", LastLogin = DateTime.UtcNow },
                new() { Username = "jane.doe", DisplayName = "Jane Doe", Email = "jane.doe@bcx.local", Department = "Operations", Role = "Manager", LastLogin = DateTime.UtcNow }
            };

            context.Users.AddRange(users);
            await context.SaveChangesAsync();
        }

        if (!context.KnowledgeItems.Any())
        {
            var admin = await context.Users.FirstAsync();
            context.KnowledgeItems.Add(new KnowledgeItem
            {
                Title = "Welcome to BCX Connect",
                Content = "This knowledge base helps you onboard quickly.",
                Category = "General",
                CreatedAt = DateTime.UtcNow,
                CreatedById = admin.Id
            });
            await context.SaveChangesAsync();
        }
    }
}
