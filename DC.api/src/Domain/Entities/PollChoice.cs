namespace DC.api.Domain.Entities;

public class PollChoice : BaseAuditableEntity
{
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int NumberOfVotes {get; set; } = 0;

    public int PollId { get; set; }

    public Poll Poll { get; set; } = null!;

    public IList<Vote> Votes { get; private set; } = new List<Vote>();
}
