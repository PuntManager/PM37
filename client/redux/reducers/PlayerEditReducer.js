// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  player: {}
};

// Reducer
export default function PlayerEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_PLAYER_SUCCESS:
      return { ...state, player: action.payload };
    case types.UPDATE_PLAYER_SUCCESS:
      return { ...state, player: action.payload };
    case types.GET_PLAYER_SUCCESS:
      return { ...state, player: action.payload };
    case types.FINDBYTABLEPLAYER_TABLE_SUCCESS:
      return { ...state, listTable: action.payload };
     // END REDUCERS
    
    case types.RESET_PLAYER:
      state = initialState;
      return state;
    default:
      return state;
  }
}