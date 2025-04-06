var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();  
builder.Services.AddCors(options => {
    options.AddPolicy("ReactApp", builder => {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials()
               .SetIsOriginAllowed(_ => true); // Add this line
    });
});

var app = builder.Build();
app.UseRouting();
app.UseCors("ReactApp");  // Add this line
app.MapHub<CodeHub>("/codehub");  // Add this line

// Add this before app.Run();
app.Use(async (context, next) => {
    context.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    await next();
});

app.Run();