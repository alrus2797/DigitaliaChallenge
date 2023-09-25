using DC.api.Application.Polls.Queries.GetPolls;

namespace DC.api.Application.Polls.Queries.GetPolls;

public class PollChoiceCreateDto {
  public int Id { get; set; }
  public string? Title { get; set; } = string.Empty;
  public string? Description { get; set; } = string.Empty;
}

public class PollChoiceDisplayDto {
  public int Id { get; set; }
  public string? Title { get; set; } = string.Empty;
  public string? Description { get; set; } = string.Empty;
  public int NumberOfVotes {get; set; } = 0;
}