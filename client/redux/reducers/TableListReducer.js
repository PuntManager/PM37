// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function TableListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_TABLE_SUCCESS:
      return { ...state, table: action.payload };
    case types.LIST_TABLE_SUCCESS:
      return { ...state, listTable: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}