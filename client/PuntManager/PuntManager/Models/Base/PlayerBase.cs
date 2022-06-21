using System;
using Newtonsoft.Json;
using PuntManager.Support;

namespace PuntManager.Models.Base
{
    public class PlayerBase : BaseBindableObject
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
        
        DateTime added;
        [JsonProperty(PropertyName = "Added")]
        public DateTime Added
        {
            get { return added.ToLocalTime(); }
            set { SetValue(ref added, value); }
        }
        
        string casinoplayerid;
        [JsonProperty(PropertyName = "CasinoPlayerID")]
        public string CasinoPlayerID
        {
            get { return casinoplayerid; }
            set { SetValue(ref casinoplayerid, value); }
        }
        
        boolean firsttimeplayer;
        [JsonProperty(PropertyName = "FirstTimePlayer")]
        public boolean FirstTimePlayer
        {
            get { return firsttimeplayer; }
            set { SetValue(ref firsttimeplayer, value); }
        }
        
        string fullname;
        [JsonProperty(PropertyName = "FullName")]
        public string FullName
        {
            get { return fullname; }
            set { SetValue(ref fullname, value); }
        }
        
        public string QualifiedName
        {
            get { return $" { CasinoPlayerID } { FullName }"; }
        }
    }
}