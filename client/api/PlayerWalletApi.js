import PlayerWalletApiGenerated from "./generated/PlayerWalletApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class PlayerWalletApi extends PlayerWalletApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get PlayerWallet List
  static getPlayerWalletList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/playerwallets")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default PlayerWalletApi;