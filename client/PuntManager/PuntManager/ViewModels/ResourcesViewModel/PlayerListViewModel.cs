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
    public class PlayerListViewModel : BaseViewModel
    {
        #region Constants

        readonly static string POPUP_DELETE_MESSAGE = "Are you sure you want to delete this Player?";

        #endregion

        #region Attributes and Properties

        // this collection main purpose is to store data from API request
        ObservableCollection<Player> _supportList;

        // this one instead is the ItemSource of the iew. 
        // this allows to modify without any exceptions, the elements of the ListView.
        ObservableCollection<Player> _playerList;

        public ObservableCollection<Player> PlayerList
        {
            get { return _playerList; }
            set { SetValue(ref _playerList, value); }
        }

        #endregion

        #region Commands

        public ICommand LoadDataCommand => new Command(async obj => await RefreshPlayerList());
        public ICommand DeletePlayerCommand => new Command<Player>(async obj => await DeletePlayerFromList(obj));
        public ICommand AddOrEditPlayerCommand => new Command<Player>(async obj => await AddOrEditPlayer(obj));
        public ICommand SearchCommand => new Command<string>(obj => FilterPlayerList(obj));

        #endregion
        
        async Task AddOrEditPlayer(Player toEdit)
        {   
            await (Application.Current.MainPage as MasterDetailPage).Detail.Navigation.PushAsync(new PlayerEdit(toEdit));
        }

        async Task RefreshPlayerList()
        {
            OnLoadingStarted(EventArgs.Empty);

            _supportList = await App.PlayerService.GETList();
            PlayerList = _supportList;

            OnLoadingEnded(EventArgs.Empty);
        }

        public void RestorePlayerList()
        {
            PlayerList = _supportList;
        }

        async Task DeletePlayerFromList(Player Player) 
        {
            CustomAlertPopUp popUp = new CustomAlertPopUp(POPUP_DELETE_MESSAGE);
            popUp.ButtonClickedEvent += async (sender, e) =>
            {
                await App.PlayerService.DELETE(Player.Id);
                await RefreshPlayerList();
            };

            await PopupNavigation.Instance.PushAsync(popUp);
        }

        void FilterPlayerList(string query) 
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                // the filtering of elements is based on the elements Id. 
                // in case you wish to change, just replace el.Id with el.OtherField
                var tempRecords = _supportList.Where(el => el.Id.ToLower().Contains(query.ToLower()));
                PlayerList = new ObservableCollection<Player>(tempRecords);
            }
            else
                PlayerList = new ObservableCollection<Player>();
        }
    }
}