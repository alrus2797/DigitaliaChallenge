using DC.api.Application.Common.Interfaces;
using DC.api.Application.Polls.Queries.GetPolls;

namespace DC.api.Application.Votes.Queries.GetVotedChoice;

public record GetVotedChoiceQuery : IRequest<List<PollChoiceDisplayDto>>
{
    public int PollId { get; init; }
    public string? Author { get; init; }
}

public class GetVotedChoiceQueryValidator : AbstractValidator<GetVotedChoiceQuery>
{
    public GetVotedChoiceQueryValidator()
    {
    }
}

public class GetVotedChoiceQueryHandler : IRequestHandler<GetVotedChoiceQuery, List<PollChoiceDisplayDto>>
{
    private readonly IApplicationDbContext _context;

    public GetVotedChoiceQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<PollChoiceDisplayDto>> Handle(GetVotedChoiceQuery request, CancellationToken cancellationToken)
    {

        var _vote = await _context.Votes
            .FirstOrDefaultAsync(v => v.PollId == request.PollId && v.Author == request.Author, cancellationToken);

        if (_vote == null)
        {
            return new List<PollChoiceDisplayDto>();
        }

        var _pollChoice = await _context.PollChoices
            .FirstOrDefaultAsync(p => p.Id == _vote.ChoiceId, cancellationToken);

        if (_pollChoice == null)
        {
            return new List<PollChoiceDisplayDto>();
        }

        return new List<PollChoiceDisplayDto>{
            new PollChoiceDisplayDto{
                Id = _pollChoice.Id,
                Title = _pollChoice.Title,
                Description = _pollChoice.Description,
                NumberOfVotes = _pollChoice.NumberOfVotes
            }
        };


    }
}
