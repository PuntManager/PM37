using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using PuntManager.Extensions;
using PuntManager.Models;
using PuntManager.Views;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;

namespace PuntManager.ViewModels.ResourcesViewModel
{
    public class TableListViewModel : BaseViewModel
    {
        #region Constants

        readonly static string POPUP_DELETE_MESSAGE = "Are you sure you want to delete this Table?";

        #endregion

        #region Attributes and Properties

        // this collection main purpose is to store data from API request
        ObservableCollection<Table> _supportList;

        // this one instead is the ItemSource of the iew. 
        // this allows to modify without any exceptions, the elements of the ListView.
        ObservableCollection<Table> _tableList;

        public ObservableCollection<Table> TableList
        {
            get { return _tableList; }
            set { SetValue(ref _tableList, value); }
        }

        #endregion

        #region Commands

        public ICommand LoadDataCommand => new Command(async obj => await RefreshTableList());
        public ICommand DeleteTableCommand => new Command<Table>(async obj => await DeleteTableFromList(obj));
        public ICommand AddOrEditTableCommand => new Command<Table>(async obj => await AddOrEditTable(obj));
        public ICommand SearchCommand => new Command<string>(obj => FilterTableList(obj));

        #endregion
        
        async Task AddOrEditTable(Table toEdit)
        {   
            await (Application.Current.MainPage as MasterDetailPage).Detail.Navigation.PushAsync(new TableEdit(toEdit));
        }

        async Task RefreshTableList()
        {
            OnLoadingStarted(EventArgs.Empty);

            _supportList = await App.TableService.GETList();
            TableList = _supportList;

            OnLoadingEnded(EventArgs.Empty);
        }

        public void RestoreTableList()
        {
            TableList = _supportList;
        }

        async Task DeleteTableFromList(Table Table) 
        {
            CustomAlertPopUp popUp = new CustomAlertPopUp(POPUP_DELETE_MESSAGE);
            popUp.ButtonClickedEvent += async (sender, e) =>
            {
                await App.TableService.DELETE(Table.Id);
                await RefreshTableList();
            };

            await PopupNavigation.Instance.PushAsync(popUp);
        }

        void FilterTableList(string query) 
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                // the filtering of elements is based on the elements Id. 
                // in case you wish to change, just replace el.Id with el.OtherField
                var tempRecords = _supportList.Where(el => el.Id.ToLower().Contains(query.ToLower()));
                TableList = new ObservableCollection<Table>(tempRecords);
            }
            else
                TableList = new ObservableCollection<Table>();
        }
    }
}