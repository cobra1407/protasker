using BU.Interfaces;
using BU.Services;
using DAL.Context;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// DBContext
builder.Services.AddDbContext<ProtaskerContext>();

// Add services to the container.
builder.Services.AddControllers();

//Utilisateur services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IExcelService, ExcelService>();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", corsPolicyBuilder =>
    {
        corsPolicyBuilder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// photos 
string rootPath = Path.GetFullPath(Path.Combine("..", "DAL", "Photos"));
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(rootPath),
    RequestPath = "/Photo"
});

app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();