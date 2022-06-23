// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function GameListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_GAME_SUCCESS:
      return { ...state, game: action.payload };
    case types.LIST_GAME_SUCCESS:
      return { ...state, listGame: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}