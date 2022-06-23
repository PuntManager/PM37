import PlayerApiGenerated from "./generated/PlayerApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class PlayerApi extends PlayerApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Player List
  static getPlayerList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/players")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default PlayerApi;