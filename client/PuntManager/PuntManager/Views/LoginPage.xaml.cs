using PuntManager.ViewModels;
using System;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace PuntManager.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
        //Set ViewModel for BindingContext
        LoginPageViewModel _viewModel
        {
            get { return BindingContext as LoginPageViewModel; }
            set { BindingContext = value; }
        }

		public LoginPage ()
		{
            InitializeComponent();

            //Setting BindingContext
            _viewModel = new LoginPageViewModel();

            _viewModel.LoadingStartedEvent += (sender, e) => { loading_view.IsVisible = true; };
            _viewModel.LoadingEndedEvent += (sender, e) => { loading_view.IsVisible = false; };

            _viewModel.LoginError += (sender, e) => { label_message.Text = e.Message; };
        }

        async Task Login_Clicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(entry_username.Text) && !string.IsNullOrWhiteSpace(entry_password.Text))
                await _viewModel.Login();
            else
                label_message.Text = "Empty Username or Password";
        }

        void Entry_Username_Completed(object sender, EventArgs e)
        {
            entry_password.Focus();
        }

        async Task Entry_Password_Completed(object sender, EventArgs e)
        {
            await Login_Clicked(null, null);
        }
    }
}