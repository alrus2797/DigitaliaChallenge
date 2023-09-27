using System.Net;
using DC.api.Application.Common.Interfaces;
using DC.api.Domain.Entities;

namespace DC.api.Application.Votes.Commands.CreateVote;

public record CreateVoteCommand : IRequest<VoteDto>
{
    public int PollId { get; init; }
    public int ChoiceId { get; init; }
    public string? Author { get; init; }
}

public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
{
    public CreateVoteCommandValidator()
    {
        RuleFor(v => v.PollId)
            .NotEmpty();
        RuleFor(v => v.ChoiceId)
            .NotEmpty();
        RuleFor(v => v.Author)
            .MaximumLength(200)
            .NotEmpty();
    }
}

public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, VoteDto>
{
    private readonly IApplicationDbContext _context;

    public CreateVoteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<VoteDto> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
    {
        var _poll = await _context.Polls
            .Include(p => p.PollChoices)
            .FirstOrDefaultAsync(p => p.Id == request.PollId, cancellationToken);

        if (_poll == null)
        {
            throw new NotFoundException(nameof(Domain.Entities.Poll), request.PollId.ToString());
        }

        Console.WriteLine("poll fetched");

        var _pollChoice = _poll.PollChoices.FirstOrDefault(p => p.Id == request.ChoiceId);


        if (_pollChoice == null)
        {
            throw new NotFoundException(nameof(Domain.Entities.PollChoice), request.ChoiceId.ToString());
        }

        Console.WriteLine("Poll choice fetched");


        var _existingVote = await _context.Votes
            .FirstOrDefaultAsync(v => v.PollId == request.PollId && v.Author == request.Author, cancellationToken);



        if (_existingVote != null)
        {
            throw new HttpRequestException(
                "You have already voted for this poll.",
                null,
                HttpStatusCode.BadRequest
            );
        }
        Console.WriteLine("Not vote exists");


        _pollChoice.NumberOfVotes++;

        Console.WriteLine("Increased number of votes");

        var _vote = new Vote
        {
            PollId = request.PollId,
            ChoiceId = request.ChoiceId,
            Author = request.Author
        };

        _context.Votes.Add(_vote);

        Console.WriteLine("Added vote");

        await _context.SaveChangesAsync(cancellationToken);

        Console.WriteLine("Saved changes");

        return new VoteDto
        {
            Id = _vote.Id,
            PollId = _vote.PollId,
            ChoiceId = _vote.ChoiceId,
            Author = _vote.Author
        };
    }
}
