using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PuntManager.Models;
using PuntManager.ViewModels.ResourcesViewModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace PuntManager.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PlayerEdit : ContentPage
    {
        // set ViewModel for BindingContext
        PlayerEditViewModel _viewModel
        {
            get { return BindingContext as PlayerEditViewModel; }
            set { BindingContext = value; }
        }

        public PlayerEdit() 
        {
            InitializeComponent();
            List<Boolean> FirstTimePlayerList = new List<Boolean>
            { 
                "False",
                "True"
            }; 
            picker_firsttimeplayer.ItemsSource = FirstTimePlayerList;
            datepicker_added.MaximumDate = DateTime.Today;
        } 

        public PlayerEdit(Player player) : this()
        {
            // setting BindingContext
            _viewModel = new PlayerEditViewModel(player);

            _viewModel.LoadingStartedEvent += (sender, e) => { loading_view.IsVisible = true; };
            _viewModel.LoadingEndedEvent += (sender, e) => { loading_view.IsVisible = false; };
        }

        async Task SavePlayer_Handler(object sender, EventArgs e)
        {
            await _viewModel.SaveOrEditPlayer();
            await Navigation.PopAsync();
        }

        void DataChanged_Handler(object sender, TextChangedEventArgs e)
        {
            button_save.IsEnabled = true
                && !string.IsNullOrWhiteSpace(entry_casinoplayerid.Text)
                && !string.IsNullOrWhiteSpace(entry_fullname.Text);

            if(_viewModel.Editing)
                button_save.IsEnabled &= e.OldTextValue != null;
        }
    }
}

