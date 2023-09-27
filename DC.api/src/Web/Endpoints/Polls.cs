
using DC.api.Application.Polls.Commands.CreatePoll;
using DC.api.Application.Polls.Queries.GetPolls;
using DC.api.Application.Polls.Queries.GetSinglePoll;

namespace DC.api.Web.Endpoints;

public class Polls : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
          .RequireAuthorization()
          .MapPost(CreatePoll);

        app.MapGroup(this)
          .MapGet(GetPoll, "{id}")
          .MapGet(GetPolls);
    }

    public async Task<PollDto<PollChoiceCreateDto>> CreatePoll(ISender sender, CreatePollCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<PollDto<PollChoiceDisplayDto>> GetPoll(ISender sender, int id)
    {
        return await sender.Send(new GetSinglePollQuery { Id = id });
    }

    public async Task<List<PollDto<PollChoiceDisplayDto>>> GetPolls(ISender sender)
    {
        return await sender.Send(new GetPollsQuery());
    }
}