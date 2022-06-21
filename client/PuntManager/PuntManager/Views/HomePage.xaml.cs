using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace PuntManager.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class HomePage : ContentPage
    {
        public HomePage()
        {
            InitializeComponent();

            UserButton.IsVisible = Settings.CurrentUserRole.Equals("ADMIN");
        }

        void ChangePage(object sender, EventArgs e)
        {
            var button = (sender as Button).Text;
            Page page = null;

            switch (button)
            {   
                case "Game":
                    page = new GameList();
                    break;
                case "Player":
                    page = new PlayerList();
                    break;
                case "Table":
                    page = new TableList();
                    break;
                case "User":
                    page = new UsersListStatic();
                    break;
            }

            (Application.Current.MainPage as MasterDetailPage).Detail = new NavigationPage(page);
        }
    }
}