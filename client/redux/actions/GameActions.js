import actionsFunction from "./generated/GameActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import GameApi from "../../api/GameApi";
 
 actionsFunction.loadGameList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return GameApi
     .getGameList()
     .then(list => {
       dispatch(actionsFunction.loadGameSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
