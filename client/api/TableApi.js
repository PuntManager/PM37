import TableApiGenerated from "./generated/TableApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class TableApi extends TableApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Table List
  static getTableList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/tables")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default TableApi;