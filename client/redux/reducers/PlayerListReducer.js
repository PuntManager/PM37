// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function PlayerListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_PLAYER_SUCCESS:
      return { ...state, player: action.payload };
    case types.LIST_PLAYER_SUCCESS:
      return { ...state, listPlayer: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}