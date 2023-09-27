namespace DC.api.Application.Votes.Commands.CreateVote;

public class VoteDto {
  public int? Id {get; set;}
  public int PollId {get; set;}
  public string? Author {get; set;}
  public int ChoiceId {get; set;}

}