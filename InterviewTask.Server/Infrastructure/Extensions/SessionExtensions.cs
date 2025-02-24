namespace InterviewTask.Server.Infrastructure.Extensions
{
    public static class SessionExtensions
    {
        private const char Separator = ',';

        public static void SetIntList(this ISession session, string key, List<int> value)
        {
            if (value == null || !value.Any())
            {
                session.Remove(key);
                return;
            }

            session.SetString(key, string.Join(Separator, value));
        }

        public static List<int> GetIntList(this ISession session, string key)
        {
            var value = session.GetString(key);

            if (string.IsNullOrWhiteSpace(value))
            {
                return [];
            }

            return value.Split(Separator).Select(int.Parse).ToList();
        }
    }
}
