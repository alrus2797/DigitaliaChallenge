using DC.api.Application.Common.Interfaces;
using DC.api.Application.Polls.Queries.GetPolls;
using DC.api.Domain.Entities;

namespace DC.api.Application.Polls.Commands.CreatePoll;

public record CreatePollCommand : IRequest<PollDto<PollChoiceCreateDto>>
{
    public string? Title { get; init; }
    public string? Description { get; init; }
    public DateTime? EndDate { get; init; }
    public List<PollChoiceCreateDto> PollChoices { get; set; } = new List<PollChoiceCreateDto>();
}

public class PollChoiceDtoValidator : AbstractValidator<PollChoiceCreateDto>
{
    public PollChoiceDtoValidator()
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .NotEmpty();
        RuleFor(v => v.Description)
            .MaximumLength(200);
    }
}

public class CreatePollCommandValidator : AbstractValidator<CreatePollCommand>
{
    public CreatePollCommandValidator()
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .NotEmpty();
        RuleFor(v => v.Description)
            .MaximumLength(200)
            .NotEmpty();
        RuleFor(v => v.EndDate)
            .NotEmpty();
        RuleForEach(v => v.PollChoices)
            .SetValidator(new PollChoiceDtoValidator());
    }
}

public class CreatePollCommandHandler : IRequestHandler<CreatePollCommand, PollDto<PollChoiceCreateDto>>
{
    private readonly IApplicationDbContext _context;

    public CreatePollCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PollDto<PollChoiceCreateDto>> Handle(CreatePollCommand request, CancellationToken cancellationToken)
    {
        var _poll = new Poll
        {
            Title = request.Title,
            Description = request.Description,
            EndDate = request.EndDate
        };

        _context.Polls.Add(_poll);

        var choices = request.PollChoices.Select(choice => new PollChoice
        {
            
            Title = choice.Title,
            Description = choice.Description,
            NumberOfVotes = 0,
            PollId = _poll.Id
        }).ToList();

        _context.PollChoices.AddRange(choices);
        await _context.SaveChangesAsync(cancellationToken);

        return new PollDto<PollChoiceCreateDto>
        {
            Id = _poll.Id,
            Title = _poll.Title,
            Description = _poll.Description,
            EndDate = _poll.EndDate,
            PollChoices = choices.Select(choice => new PollChoiceCreateDto
            {
                Id = choice.Id,
                Title = choice.Title,
                Description = choice.Description,
            }).ToList()
        };
    }
}
