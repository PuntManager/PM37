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
    public partial class GameEdit : ContentPage
    {
        // set ViewModel for BindingContext
        GameEditViewModel _viewModel
        {
            get { return BindingContext as GameEditViewModel; }
            set { BindingContext = value; }
        }

        public GameEdit() 
        {
            InitializeComponent();
            List<Number> StatusList = new List<Number>
            { 
                "Broken",
                "Ended",
                "Paused",
                "Started"
            }; 
            picker_status.ItemsSource = StatusList;
        } 

        public GameEdit(Game game) : this()
        {
            // setting BindingContext
            _viewModel = new GameEditViewModel(game);

            _viewModel.LoadingStartedEvent += (sender, e) => { loading_view.IsVisible = true; };
            _viewModel.LoadingEndedEvent += (sender, e) => { loading_view.IsVisible = false; };
        }

        async Task SaveGame_Handler(object sender, EventArgs e)
        {
            await _viewModel.SaveOrEditGame();
            await Navigation.PopAsync();
        }

        void DataChanged_Handler(object sender, TextChangedEventArgs e)
        {
            button_save.IsEnabled = true
                && !string.IsNullOrWhiteSpace(entry_tablelist.Text);

            if(_viewModel.Editing)
                button_save.IsEnabled &= e.OldTextValue != null;
        }
    }
}

