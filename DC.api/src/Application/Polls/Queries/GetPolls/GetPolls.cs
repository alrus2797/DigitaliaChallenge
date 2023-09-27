using DC.api.Application.Common.Interfaces;

namespace DC.api.Application.Polls.Queries.GetPolls;

public record GetPollsQuery : IRequest<List<PollDto<PollChoiceDisplayDto>>>
{

}

public class GetPollsQueryValidator : AbstractValidator<GetPollsQuery>
{
    public GetPollsQueryValidator()
    {
    }
}

public class GetPollsQueryHandler : IRequestHandler<GetPollsQuery, List<PollDto<PollChoiceDisplayDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetPollsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<PollDto<PollChoiceDisplayDto>>> Handle(GetPollsQuery request, CancellationToken cancellationToken)
    {
        var _polls = await _context.Polls.AsNoTracking()
            .OrderByDescending(p => p.EndDate)
            .Include(p => p.PollChoices)
            .ToListAsync(cancellationToken);
        _polls.ForEach(poll => {
            Console.WriteLine(poll.Title);
            poll.PollChoices.ForEach(pollChoice => {
                Console.WriteLine($"{pollChoice.Title} - {pollChoice.NumberOfVotes}");
            });
        });
        return _polls.Select(poll => new PollDto<PollChoiceDisplayDto>
        {
            Id = poll.Id,
            Title = poll.Title,
            Description = poll.Description,
            EndDate = poll.EndDate,
            PollChoices = poll.PollChoices.Select(pollChoice => new PollChoiceDisplayDto
            {
                Id = pollChoice.Id,
                Title = pollChoice.Title,
                Description = pollChoice.Description,
                NumberOfVotes = pollChoice.NumberOfVotes,
            }).ToList(),
        }).ToList();
    }
}
