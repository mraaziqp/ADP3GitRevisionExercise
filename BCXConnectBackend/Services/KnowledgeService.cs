using BCXConnectBackend.Data;
using BCXConnectBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BCXConnectBackend.Services;

public class KnowledgeService
{
    private readonly ChatContext _context;

    public KnowledgeService(ChatContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<KnowledgeItem>> SearchAsync(string term)
    {
        return await _context.KnowledgeItems
            .Where(k => k.Title.Contains(term) || k.Content.Contains(term))
            .OrderByDescending(k => k.CreatedAt)
            .ToListAsync();
    }

    public async Task<KnowledgeItem> CreateAsync(KnowledgeItem item)
    {
        item.CreatedAt = DateTime.UtcNow;
        _context.KnowledgeItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }
}
