using Rg.Plugins.Popup.Services;
using PuntManager.Extensions;
using PuntManager.Models;
using PuntManager.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Threading.Tasks;

namespace PuntManager.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Profile : ContentPage
    {
        ProfilePageViewModel _viewModel
        {
            get { return BindingContext as ProfilePageViewModel; }
            set { BindingContext = value; }
        }

        public Profile()
        {
            InitializeComponent();

            ToolbarItems.Add(new ToolbarItem("Edit", null, Make_User_Editable));
        }

        public Profile(User user) : this()
        {
            BindingContext = new ProfilePageViewModel(user);

            _viewModel.LoadingStartedEvent += (sender, e) => { loading_view.IsVisible = true; };
            _viewModel.LoadingEndedEvent += (sender, e) => { Make_User_Editable(); loading_view.IsVisible = false; };

            if (string.IsNullOrWhiteSpace(entry_name.Text) && string.IsNullOrWhiteSpace(entry_lastname.Text) && string.IsNullOrWhiteSpace(entry_mail.Text))
                Make_User_Editable();
        }

        void Make_User_Editable()
        {
            entry_name.IsEnabled = !entry_name.IsEnabled;
            entry_lastname.IsEnabled = !entry_lastname.IsEnabled;
            entry_mail.IsEnabled = !entry_mail.IsEnabled;

            button_save.IsVisible = !button_save.IsVisible;
        }

        async Task Save_User_Handler(object sender, System.EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(entry_name.Text) && !string.IsNullOrWhiteSpace(entry_lastname.Text) && !string.IsNullOrWhiteSpace(entry_mail.Text))
                await _viewModel.UpdateUserInfo();
        }

        void Change_Password_Handler(object sender, System.EventArgs e)
        {
            PopupNavigation.Instance.PushAsync(new ChangePasswordPopUp());
        }
    }
}