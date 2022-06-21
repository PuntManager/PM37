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
    public class GameRestServiceBase : RestClient
    {
        const string GameApi = "game/";

        //ADDTABLE
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task AddTable()
        {

        }

        //POST
        /// <summary>
        /// Add a new Game
        /// </summary>
        /// <param name="item">Game to Add</param>
        /// <returns>void</returns>
        public async Task POST(Game item)
        {
            try
            {   
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(GameApi, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //DELETE
        /// <summary>
        /// Delete a Game
        /// </summary>
        /// <param name="id">Id of the Game to Delete</param>
        /// <returns>void</returns>
        public async Task DELETE(string id)
        {
            try
            {
                var response = await Client.DeleteAsync(GameApi + id);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //FindByGameTables
        /// <summary>
        /// Get a  Game using FindByGameTables
        /// </summary>
        /// <returns>Game</returns>
        public async Task<Game> findByGameTables(string id)
        {
            Game game = new Game();
            try
            {
                var content = await Client.GetStringAsync(GameApi + "findByGameTables/" + id  );
                game = JsonConvert.DeserializeObject<Game>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return game;
        }

        //GET ID
        /// <summary>
        /// Get a Game
        /// </summary>
        /// <returns>Game</returns>
        public async Task<Game> GETId(string gameId)
        {
            Game game = new Game();
            try
            {
                var content = await Client.GetStringAsync(GameApi + gameId);
                game = JsonConvert.DeserializeObject<Game>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return game;
        }

        //GET
        /// <summary>
        /// Get the complete list of Games
        /// </summary>
        /// <returns>Game List</returns>
        public async Task<ObservableCollection<Game>> GETList()
        {
            ObservableCollection<Game> gamelist = new ObservableCollection<Game>();
            try
            {
                var content = await Client.GetStringAsync(GameApi);
                gamelist = JsonConvert.DeserializeObject<ObservableCollection<Game>>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return gamelist;
        }

        //PAUSE
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task pause()
        {

        }

        //STOP
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task stop()
        {

        }

        //PUT
        /// <summary>
        /// Update info of a Game
        /// </summary>
        /// <param name="item">Game to Update</param>
        /// <returns></returns>
        public async Task PUT(Game item)
        {
            try
            {
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(GameApi + item.Id, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }
    }
}
