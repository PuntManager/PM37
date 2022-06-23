import { combineReducers } from "redux";

// START IMPORT REDUCERS
import GameEditReducer from "./GameEditReducer";
import GameListReducer from "./GameListReducer";
import HomeReducer from "./HomeReducer";
import PlayerEditReducer from "./PlayerEditReducer";
import PlayerListReducer from "./PlayerListReducer";
import TableEditReducer from "./TableEditReducer";
import TableListReducer from "./TableListReducer";

// END IMPORT REDUCERS


// CUSTOM REDUCERS
import LoginReducer from "./LoginReducer";
import ProfileReducer from "./ProfileReducer";
import UserEditReducer from "./UserEditReducer";
import UserListReducer from "./UserListReducer";

const rootReducer = combineReducers({
  
  // INSERT HERE YOUR CUSTOM REDUCERS
  LoginReducer,
  ProfileReducer,
  UserEditReducer,
  UserListReducer,

  // START COMBINE REDUCERS
	GameEditReducer,
	GameListReducer,
	HomeReducer,
	PlayerEditReducer,
	PlayerListReducer,
	TableEditReducer,
	TableListReducer,
 // END COMBINE REDUCERS

});

export default rootReducer;
