// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  table: {}
};

// Reducer
export default function TableEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_TABLE_SUCCESS:
      return { ...state, table: action.payload };
    case types.UPDATE_TABLE_SUCCESS:
      return { ...state, table: action.payload };
    case types.GET_TABLE_SUCCESS:
      return { ...state, table: action.payload };
    case types.LIST_PLAYER_SUCCESS:
      return { ...state, listPlayer: action.payload };
    case types.FINDBYGAMETABLES_GAME_SUCCESS:
      return { ...state, listGame: action.payload };
     // END REDUCERS
    
    case types.RESET_TABLE:
      state = initialState;
      return state;
    default:
      return state;
  }
}