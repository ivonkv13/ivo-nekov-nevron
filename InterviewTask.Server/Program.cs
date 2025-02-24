
using InterviewTask.Server.Application.Interfaces;
using InterviewTask.Server.Application.Services;

namespace InterviewTask.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddHttpContextAccessor();  // Required for accessing HttpContext
            builder.Services.AddScoped<ISessionService, SessionService>(); // Register Session Service
            builder.Services.AddDistributedMemoryCache(); // Required for session storage
            builder.Services.AddSession(options =>
            {
                // Ensure cookies can be sent cross-site
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            }); 

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.WithOrigins("https://127.0.0.1:53965")
                          .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
                });
            });

            var app = builder.Build();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseSession();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
