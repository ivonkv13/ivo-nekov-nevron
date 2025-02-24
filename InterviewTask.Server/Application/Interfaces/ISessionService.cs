namespace InterviewTask.Server.Application.Interfaces
{
    public interface ISessionService
    {
        List<int> GetNumbersFromSession();
        void ClearSession();
        void GenerateRandomNumber();
        int SumNumbers();
    }
}