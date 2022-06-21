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
    public class PlayerEditViewModel : BaseViewModel
    {   
        
        
        
        
        #region Attributes and Properties

        public bool Editing = true;

        Player _player;
        public Player Player
        {
            get { return _player; }
            set { SetValue(ref _player, value); }
        }
        
        
        #endregion

        
        
        

        public PlayerEditViewModel(Player playerToEdit)
        {
            if (playerToEdit == null)
            {
                playerToEdit = new Player();
                Editing = false;
            }

            Player = playerToEdit;
            
        }
        
        public async Task SaveOrEditPlayer()
        {
            OnLoadingStarted(EventArgs.Empty);
            
            
            if (Editing)
                await App.PlayerService.PUT(_player);
            else
                await App.PlayerService.POST(_player);

            OnLoadingEnded(EventArgs.Empty);
        }
        
        
    }
}