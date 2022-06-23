// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
};

// Reducer
export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_GAME_SUCCESS:
      return { ...state, game: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}