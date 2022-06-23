import actionsFunction from "./generated/PlayerWalletActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import PlayerWalletApi from "../../api/PlayerWalletApi";
 
 actionsFunction.loadPlayerWalletList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return PlayerWalletApi
     .getPlayerWalletList()
     .then(list => {
       dispatch(actionsFunction.loadPlayerWalletSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
