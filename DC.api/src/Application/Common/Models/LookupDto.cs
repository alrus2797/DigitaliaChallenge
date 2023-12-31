﻿using DC.api.Domain.Entities;

namespace DC.api.Application.Common.Models;

public class LookupDto
{
    public int Id { get; init; }

    public string? Title { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TodoList, LookupDto>();
            CreateMap<TodoItem, LookupDto>();
            CreateMap<Poll, LookupDto>();
            CreateMap<PollChoice, LookupDto>();
            CreateMap<Vote, LookupDto>();
        }
    }
}
