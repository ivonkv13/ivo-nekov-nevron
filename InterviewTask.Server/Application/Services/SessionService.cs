using InterviewTask.Server.Application.Interfaces;
using InterviewTask.Server.Infrastructure.Extensions;

namespace InterviewTask.Server.Application.Services
{
    public class SessionService : ISessionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private const string SessionKey = "NumbersList";

        public SessionService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor
                ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        private ISession Session => _httpContextAccessor.HttpContext?.Session
            ?? throw new InvalidOperationException("Session is not available");

        public List<int> GetNumbersFromSession()
        {
            var numbers = Session.GetIntList(SessionKey) ?? [];
            return numbers;
        }

        public void ClearSession()
        {
            Session.Remove(SessionKey);
        }

        public void GenerateRandomNumber()
        {
            var numbers = GetNumbersFromSession();

            var randomNumber = new Random().Next(1, 100);
            numbers.Add(randomNumber);

            Session.SetIntList(SessionKey, numbers);
        }

        public int SumNumbers()
        {
            var numbers = GetNumbersFromSession();

            var sum = numbers.Sum();

            return sum;
        }
    }
}
