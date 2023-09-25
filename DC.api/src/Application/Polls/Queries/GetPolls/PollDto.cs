using DC.api.Application.Votes.Commands.CreateVote;

namespace DC.api.Application.Polls.Queries.GetPolls;

public class PollDto<PCDto> {
  public PollDto() {
    PollChoices = new List<PCDto>();
    Votes = new List<VoteDto>();
  }
  public int Id { get; set; }
  public string? Title { get; set; } = string.Empty;
  public string? Description { get; set; } = string.Empty;
  public DateTime? EndDate { get; set; }
  public IList<PCDto> PollChoices { get; set; } = new List<PCDto>();
  public IList<VoteDto> Votes { get; private set; } = new List<VoteDto>();  
}
