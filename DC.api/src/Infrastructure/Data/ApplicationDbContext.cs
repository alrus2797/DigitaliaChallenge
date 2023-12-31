﻿using System.Reflection;
using DC.api.Application.Common.Interfaces;
using DC.api.Domain.Entities;
using DC.api.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace DC.api.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<Poll> Polls {get; set;}
    public DbSet<PollChoice> PollChoices {get; set;}
    public DbSet<Vote> Votes {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        builder.Entity<IdentityUserToken<string>>().ToTable(nameof(IdentityUserToken<string>), t=> t.ExcludeFromMigrations());
        builder.Entity<IdentityUserLogin<string>>().ToTable(nameof(IdentityUserLogin<string>), t=> t.ExcludeFromMigrations());

        base.OnModelCreating(builder);
    }
}
