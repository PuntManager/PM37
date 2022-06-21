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
    public class TableEditViewModel : BaseViewModel
    {   
        
        
        
        
        #region Attributes and Properties

        public bool Editing = true;

        Table _table;
        public Table Table
        {
            get { return _table; }
            set { SetValue(ref _table, value); }
        }
        
        // this is the collection is used as SelectedItem for the Player picker 
        Player _tableplayer;
        public Player TablePlayer
        {
            get { return _tableplayer; }
            set { SetValue(ref _tableplayer, value); Table.TablePlayer = value.Id; }
        }

        // this collection is used to store all Player available 
        ObservableCollection<Player> _playerList;

        // this is the collection is used as ItemSource for the Player picker 
        public ObservableCollection<Player> PlayerList
        {
            get { return _playerList; }
            set { SetValue(ref _playerList, value); }
        }
        
        #endregion

        
        
        

        public TableEditViewModel(Table tableToEdit)
        {
            if (tableToEdit == null)
            {
                tableToEdit = new Table();
                Editing = false;
            }

            Table = tableToEdit;
            
        }
        
        public async Task SaveOrEditTable()
        {
            OnLoadingStarted(EventArgs.Empty);
            
            
            if (Editing)
                await App.TableService.PUT(_table);
            else
                await App.TableService.POST(_table);

            OnLoadingEnded(EventArgs.Empty);
        }
        
        
    }
}