// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  game: {}
};

// Reducer
export default function GameEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_GAME_SUCCESS:
      return { ...state, game: action.payload };
    case types.UPDATE_GAME_SUCCESS:
      return { ...state, game: action.payload };
    case types.GET_GAME_SUCCESS:
      return { ...state, game: action.payload };
    case types.LIST_TABLE_SUCCESS:
      return { ...state, listTable: action.payload };
     // END REDUCERS
    
    case types.RESET_GAME:
      state = initialState;
      return state;
    default:
      return state;
  }
}