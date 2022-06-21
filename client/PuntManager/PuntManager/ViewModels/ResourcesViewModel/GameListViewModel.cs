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
    public class GameListViewModel : BaseViewModel
    {
        #region Constants

        readonly static string POPUP_DELETE_MESSAGE = "Are you sure you want to delete this Game?";

        #endregion

        #region Attributes and Properties

        // this collection main purpose is to store data from API request
        ObservableCollection<Game> _supportList;

        // this one instead is the ItemSource of the iew. 
        // this allows to modify without any exceptions, the elements of the ListView.
        ObservableCollection<Game> _gameList;

        public ObservableCollection<Game> GameList
        {
            get { return _gameList; }
            set { SetValue(ref _gameList, value); }
        }

        #endregion

        #region Commands

        public ICommand LoadDataCommand => new Command(async obj => await RefreshGameList());
        public ICommand DeleteGameCommand => new Command<Game>(async obj => await DeleteGameFromList(obj));
        public ICommand AddOrEditGameCommand => new Command<Game>(async obj => await AddOrEditGame(obj));
        public ICommand SearchCommand => new Command<string>(obj => FilterGameList(obj));

        #endregion
        
        async Task AddOrEditGame(Game toEdit)
        {   
            await (Application.Current.MainPage as MasterDetailPage).Detail.Navigation.PushAsync(new GameEdit(toEdit));
        }

        async Task RefreshGameList()
        {
            OnLoadingStarted(EventArgs.Empty);

            _supportList = await App.GameService.GETList();
            GameList = _supportList;

            OnLoadingEnded(EventArgs.Empty);
        }

        public void RestoreGameList()
        {
            GameList = _supportList;
        }

        async Task DeleteGameFromList(Game Game) 
        {
            CustomAlertPopUp popUp = new CustomAlertPopUp(POPUP_DELETE_MESSAGE);
            popUp.ButtonClickedEvent += async (sender, e) =>
            {
                await App.GameService.DELETE(Game.Id);
                await RefreshGameList();
            };

            await PopupNavigation.Instance.PushAsync(popUp);
        }

        void FilterGameList(string query) 
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                // the filtering of elements is based on the elements Id. 
                // in case you wish to change, just replace el.Id with el.OtherField
                var tempRecords = _supportList.Where(el => el.Id.ToLower().Contains(query.ToLower()));
                GameList = new ObservableCollection<Game>(tempRecords);
            }
            else
                GameList = new ObservableCollection<Game>();
        }
    }
}