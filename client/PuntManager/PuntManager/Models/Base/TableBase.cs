using System;
using Newtonsoft.Json;
using PuntManager.Support;

namespace PuntManager.Models.Base
{
    public class TableBase : BaseBindableObject
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
        
        Object playerslist;
        [JsonProperty(PropertyName = "PlayersList")]
        public Object PlayersList
        {
            get { return playerslist; }
            set { SetValue(ref playerslist, value); }
        }
        
        string tableplayer;
        [JsonProperty(PropertyName = "TablePlayer")]
        public string TablePlayer
        {
            get { return tableplayer; }
            set { SetValue(ref tableplayer, value); }
        }
        
        public string QualifiedName
        {
            get { return $""; }
        }
    }
}