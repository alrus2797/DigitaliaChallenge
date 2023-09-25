using DC.api.Domain.Entities;

namespace DC.api.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }
    DbSet<Poll> Polls { get; set;}
    DbSet<PollChoice> PollChoices { get; set;}
    DbSet<Vote> Votes { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
