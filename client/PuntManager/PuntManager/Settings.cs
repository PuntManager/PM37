using Plugin.Settings;
using Plugin.Settings.Abstractions;

namespace PuntManager
{
    /// <summary>
    /// This is the Settings static class that can be used in your Core solution or in any
    /// of your client applications. All settings are laid out the same exact way with getters
    /// and setters. 
    /// </summary>
    public static class Settings
    {
        private static ISettings AppSettings => CrossSettings.Current;

        #region Setting Constants

        public static string AuthenticationToken
        {
            get => AppSettings.GetValueOrDefault(nameof(AuthenticationToken), string.Empty);
            set => AppSettings.AddOrUpdateValue(nameof(AuthenticationToken), value);
        }

        public static string UserId
        {
            get => AppSettings.GetValueOrDefault(nameof(UserId), string.Empty);
            set => AppSettings.AddOrUpdateValue(nameof(UserId), value);
        }

        public static string Password
        {
            get => AppSettings.GetValueOrDefault(nameof(Password), string.Empty);
            set => AppSettings.AddOrUpdateValue(nameof(Password), value);
        }

        public static string CurrentUserRole
        {
            get => AppSettings.GetValueOrDefault(nameof(CurrentUserRole), string.Empty);
            set => AppSettings.AddOrUpdateValue(nameof(CurrentUserRole), value);
        }

        #endregion
    }
}
