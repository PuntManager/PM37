import actionsFunction from "./generated/TableActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import TableApi from "../../api/TableApi";
 
 actionsFunction.loadTableList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return TableApi
     .getTableList()
     .then(list => {
       dispatch(actionsFunction.loadTableSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
