import actionsFunction from "./generated/PlayerActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import PlayerApi from "../../api/PlayerApi";
 
 actionsFunction.loadPlayerList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return PlayerApi
     .getPlayerList()
     .then(list => {
       dispatch(actionsFunction.loadPlayerSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
