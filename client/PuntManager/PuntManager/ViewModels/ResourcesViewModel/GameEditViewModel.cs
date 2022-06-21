using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using PuntManager.Extensions;
using PuntManager.Models;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;

namespace PuntManager.ViewModels.ResourcesViewModel
{
    public class GameEditViewModel : BaseViewModel
    {   
        
        
        
        
        #region Attributes and Properties

        public bool Editing = true;

        Game _game;
        public Game Game
        {
            get { return _game; }
            set { SetValue(ref _game, value); }
        }
        
        // this is the collection is used as SelectedItem for the Table picker 
        Table _gametables;
        public Table GameTables
        {
            get { return _gametables; }
            set { SetValue(ref _gametables, value); Game.GameTables = value.Id; }
        }

        // this collection is used to store all Table available 
        ObservableCollection<Table> _tableList;

        // this is the collection is used as ItemSource for the Table picker 
        public ObservableCollection<Table> TableList
        {
            get { return _tableList; }
            set { SetValue(ref _tableList, value); }
        }
        
        #endregion

        
        
        

        public GameEditViewModel(Game gameToEdit)
        {
            if (gameToEdit == null)
            {
                gameToEdit = new Game();
                Editing = false;
            }

            Game = gameToEdit;
            
            // async load lists
            Task.Factory.StartNew(GetData);
            
        }
        
        async Task GetData()
        {
            OnLoadingStarted(EventArgs.Empty);
            
            TableList = await App.TableService.GETList();

            if (Editing)
            {   
                // get the Table from the TableList (the Game object only has its id)
                GameTables = _tableList.Single((arg) => arg.Id.Equals(_game.GameTables));
            }
            

            OnLoadingEnded(EventArgs.Empty);
        }
        
        
        public async Task SaveOrEditGame()
        {
            OnLoadingStarted(EventArgs.Empty);
            
            
            if (Editing)
                await App.GameService.PUT(_game);
            else
                await App.GameService.POST(_game);

            OnLoadingEnded(EventArgs.Empty);
        }
        
        
    }
}