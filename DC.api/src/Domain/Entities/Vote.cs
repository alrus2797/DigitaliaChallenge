namespace DC.api.Domain.Entities;

public class Vote : BaseAuditableEntity
{
  public int PollId { get; set; }

  public string? Author { get; set; }

  public int  ChoiceId {get; set; }

  public Poll Poll { get; set; } = null!;

  public PollChoice Choice { get; set; } = null!;

}
