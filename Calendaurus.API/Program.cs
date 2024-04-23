using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICalendarService, CalendarService>();
builder.Services.AddScoped<IRepository<CalendarEntry>, CalendarEntryEfRepository<CalendarEntry>>();
builder.Services.AddDbContext<CalendaurusContext>(options => options.UseSqlServer("Server=localhost;Database=Calendaurus;User Id=sa;Password=Alex123.;Encrypt=False", b => b.MigrationsAssembly("Calendaurus.API")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
