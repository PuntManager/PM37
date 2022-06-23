import GameApiGenerated from "./generated/GameApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class GameApi extends GameApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Game List
  static getGameList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/games")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default GameApi;