using DC.api.Application.Common.Interfaces;
using DC.api.Application.Polls.Queries.GetPolls;

namespace DC.api.Application.Polls.Queries.GetSinglePoll;

public record GetSinglePollQuery : IRequest<PollDto<PollChoiceDisplayDto>>
{
    public int Id { get; init; }
}

public class GetSinglePollQueryValidator : AbstractValidator<GetSinglePollQuery>
{
    public GetSinglePollQueryValidator()
    {
        RuleFor(v => v.Id)
            .NotEmpty();
    }
}

public class GetSinglePollQueryHandler : IRequestHandler<GetSinglePollQuery, PollDto<PollChoiceDisplayDto>>
{
    private readonly IApplicationDbContext _context;

    public GetSinglePollQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PollDto<PollChoiceDisplayDto>> Handle(GetSinglePollQuery request, CancellationToken cancellationToken)
    {
        var _poll = await _context.Polls
            .Include(p => p.PollChoices)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (_poll == null)
        {
            throw new NotFoundException(nameof(Domain.Entities.Poll), request.Id.ToString());
        }

        return new PollDto<PollChoiceDisplayDto>
        {
            Id = _poll.Id,
            Title = _poll.Title,
            Description = _poll.Description,
            EndDate = _poll.EndDate,
            PollChoices = _poll.PollChoices.Select(p => new PollChoiceDisplayDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                NumberOfVotes = p.NumberOfVotes
            }).ToList()
        };
    }
}
