using System;
using Newtonsoft.Json;
using PuntManager.Support;

namespace PuntManager.Models.Base
{
    public class GameBase : BaseBindableObject
    {
         // Id Start
		string _id;
		[JsonProperty(PropertyName = "_id")]
		public string Id
		{
			get { return _id; }
			set { SetValue(ref _id, value); }
		}
		 // Id End 
        
        int status;
        [JsonProperty(PropertyName = "Status")]
        public int Status
        {
            get { return status; }
            set { SetValue(ref status, value); }
        }
        
        Object tablelist;
        [JsonProperty(PropertyName = "TableList")]
        public Object TableList
        {
            get { return tablelist; }
            set { SetValue(ref tablelist, value); }
        }
        
        string gametables;
        [JsonProperty(PropertyName = "GameTables")]
        public string GameTables
        {
            get { return gametables; }
            set { SetValue(ref gametables, value); }
        }
        
    }
}