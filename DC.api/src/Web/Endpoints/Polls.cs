
using DC.api.Application.Polls.Commands.CreatePoll;
using DC.api.Application.Polls.Queries.GetPolls;

namespace DC.api.Web.Endpoints;

public class Polls : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
          .RequireAuthorization()
          .MapPost(CreatePoll);

        app.MapGroup(this)
          .MapGet(GetPolls);
    }

    public async Task<PollDto<PollChoiceCreateDto>> CreatePoll(ISender sender, CreatePollCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<List<PollDto<PollChoiceDisplayDto>>> GetPolls(ISender sender)
    {
        return await sender.Send(new GetPollsQuery());
    }
}