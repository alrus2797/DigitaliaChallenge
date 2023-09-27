
using DC.api.Application.Polls.Queries.GetPolls;
using DC.api.Application.Votes.Commands.CreateVote;
using DC.api.Application.Votes.Queries.GetVotedChoice;

namespace DC.api.Web.Endpoints;

public class Votes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
          .MapPost(CreateVote)
          .MapGet(GetVotedChoice, "{pollId}/{author}");
    }

    public async Task<VoteDto> CreateVote(ISender sender, CreateVoteCommand command)
    {
        Console.WriteLine("CreateVote controller");
        return await sender.Send(command);
    }

    public async Task<List<PollChoiceDisplayDto>> GetVotedChoice(ISender sender, int pollId, string author)
    {
        return await sender.Send(new GetVotedChoiceQuery { PollId = pollId, Author = author });
    }
}