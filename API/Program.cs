using System.Net.Mime;
using API.Data;
using Microsoft.AspNetCore.Routing.Tree;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DI => Dependency Injection Section
// Add services to the container.



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// Swagger services is installed here!
builder.Services.AddSwaggerGen();
// Adding DbContext to Middleware
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Then build the app
var app = builder.Build();

// Configure the HTTP request pipeline.
// We can implement middleware to our app here!
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// In here we're creating the database if it's not exist and running initialize function inside the DbInitializer class 
// To seed product table in the database
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occured during migration!");
}


app.Run();
