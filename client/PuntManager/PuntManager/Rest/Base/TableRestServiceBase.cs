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
    public class TableRestServiceBase : RestClient
    {
        const string TableApi = "table/";

        //ADDPLAYERTOTABLE
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task AddPlayerToTable()
        {

        }

        //LISTTABLEPLAYERS
        /// <summary>
        ///This is your API     
        ///</summary>
        public async Task ListTablePlayers()
        {

        }

        //POST
        /// <summary>
        /// Add a new Table
        /// </summary>
        /// <param name="item">Table to Add</param>
        /// <returns>void</returns>
        public async Task POST(Table item)
        {
            try
            {   
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(TableApi, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //DELETE
        /// <summary>
        /// Delete a Table
        /// </summary>
        /// <param name="id">Id of the Table to Delete</param>
        /// <returns>void</returns>
        public async Task DELETE(string id)
        {
            try
            {
                var response = await Client.DeleteAsync(TableApi + id);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }

        //FindByPlayersList
        /// <summary>
        /// Get a  Table using FindByPlayersList
        /// </summary>
        /// <returns>Table</returns>
        public async Task<Table> findByPlayersList(string id)
        {
            Table table = new Table();
            try
            {
                var content = await Client.GetStringAsync(TableApi + "findByPlayersList/" + id  );
                table = JsonConvert.DeserializeObject<Table>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return table;
        }

        //FindByTablePlayer
        /// <summary>
        /// Get a  Table using FindByTablePlayer
        /// </summary>
        /// <returns>Table</returns>
        public async Task<Table> findByTablePlayer(string id)
        {
            Table table = new Table();
            try
            {
                var content = await Client.GetStringAsync(TableApi + "findByTablePlayer/" + id  );
                table = JsonConvert.DeserializeObject<Table>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return table;
        }

        //GET ID
        /// <summary>
        /// Get a Table
        /// </summary>
        /// <returns>Table</returns>
        public async Task<Table> GETId(string tableId)
        {
            Table table = new Table();
            try
            {
                var content = await Client.GetStringAsync(TableApi + tableId);
                table = JsonConvert.DeserializeObject<Table>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return table;
        }

        //GET
        /// <summary>
        /// Get the complete list of Tables
        /// </summary>
        /// <returns>Table List</returns>
        public async Task<ObservableCollection<Table>> GETList()
        {
            ObservableCollection<Table> tablelist = new ObservableCollection<Table>();
            try
            {
                var content = await Client.GetStringAsync(TableApi);
                tablelist = JsonConvert.DeserializeObject<ObservableCollection<Table>>(content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR {0}", e);
            }
            return tablelist;
        }

        //PUT
        /// <summary>
        /// Update info of a Table
        /// </summary>
        /// <param name="item">Table to Update</param>
        /// <returns></returns>
        public async Task PUT(Table item)
        {
            try
            {
                var json = JsonConvert.SerializeObject(item);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await Client.PostAsync(TableApi + item.Id, content);
            }
            catch (Exception e)
            {
                Debug.WriteLine(@"				ERROR{0}", e);
            }
        }
    }
}
