using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using PuntManager.Models;
using Newtonsoft.Json;

namespace PuntManager.Rest.Base
{
    public class PlayerRestServiceBase : RestClient
    {
        const string PlayerApi = "player/";

        //KNOCKOUT
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task KnockOut()
        {

        }

        //POST
        /// <summary>
        /// Add a new Player
        /// </summary>
        /// <param name="item">Player to Add</param>
        /// <returns>void</returns>
        public async Task POST(Player item)
        {
            try
            {   
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(PlayerApi, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //DELETE
        /// <summary>
        /// Delete a Player
        /// </summary>
        /// <param name="id">Id of the Player to Delete</param>
        /// <returns>void</returns>
        public async Task DELETE(string id)
        {
            try
            {
                var response = await Client.DeleteAsync(PlayerApi + id);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //GET ID
        /// <summary>
        /// Get a Player
        /// </summary>
        /// <returns>Player</returns>
        public async Task<Player> GETId(string playerId)
        {
            Player player = new Player();
            try
            {
                var content = await Client.GetStringAsync(PlayerApi + playerId);
                player = JsonConvert.DeserializeObject<Player>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return player;
        }

        //GET
        /// <summary>
        /// Get the complete list of Players
        /// </summary>
        /// <returns>Player List</returns>
        public async Task<ObservableCollection<Player>> GETList()
        {
            ObservableCollection<Player> playerlist = new ObservableCollection<Player>();
            try
            {
                var content = await Client.GetStringAsync(PlayerApi);
                playerlist = JsonConvert.DeserializeObject<ObservableCollection<Player>>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return playerlist;
        }

        //PUT
        /// <summary>
        /// Update info of a Player
        /// </summary>
        /// <param name="item">Player to Update</param>
        /// <returns></returns>
        public async Task PUT(Player item)
        {
            try
            {
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(PlayerApi + item.Id, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }
    }
}
