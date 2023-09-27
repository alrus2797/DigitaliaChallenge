namespace DC.api.Domain.Entities;

public class Poll : BaseAuditableEntity
{
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTime? EndDate { get; set; }
    public List<PollChoice> PollChoices { get; private set; } = new List<PollChoice>();
    public IList<Vote> Votes { get; private set; } = new List<Vote>();

}
