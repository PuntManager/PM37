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
    public partial class TableEdit : ContentPage
    {
        // set ViewModel for BindingContext
        TableEditViewModel _viewModel
        {
            get { return BindingContext as TableEditViewModel; }
            set { BindingContext = value; }
        }

        public TableEdit() 
        {
            InitializeComponent();
        } 

        public TableEdit(Table table) : this()
        {
            // setting BindingContext
            _viewModel = new TableEditViewModel(table);

            _viewModel.LoadingStartedEvent += (sender, e) => { loading_view.IsVisible = true; };
            _viewModel.LoadingEndedEvent += (sender, e) => { loading_view.IsVisible = false; };
        }

        async Task SaveTable_Handler(object sender, EventArgs e)
        {
            await _viewModel.SaveOrEditTable();
            await Navigation.PopAsync();
        }

        void DataChanged_Handler(object sender, TextChangedEventArgs e)
        {
            button_save.IsEnabled = true
                && !string.IsNullOrWhiteSpace(entry_playerslist.Text);

            if(_viewModel.Editing)
                button_save.IsEnabled &= e.OldTextValue != null;
        }
    }
}

