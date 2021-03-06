/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  TO CUSTOMIZE FUNCTIONS IN PlayerActionsGenerated.js PLEASE EDIT ../PlayerActions.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */

import * as types from "../../actionTypes";
import PlayerApi from "../../../api/PlayerApi";

let actionsFunction = {
  
  // Reset reducer
  reset: function() {
    return { type: types.RESET_PLAYER };
  },

  //CRUD METHODS

  // Create player
  createPlayer: function(player) {
    return function(dispatch) {
      return PlayerApi
        .createPlayer(player)
        .then(player => {
          dispatch(actionsFunction.createPlayerSuccess(player));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  createPlayerSuccess: function(player) {
    return { type: types.CREATE_PLAYER_SUCCESS, payload: player };
  },


  // Delete player
  deletePlayer: function(id) {
    return function(dispatch) {
      return PlayerApi
        .deletePlayer(id)
        .then(player => {
          dispatch(actionsFunction.deletePlayerSuccess(player));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  deletePlayerSuccess: function(player) {
    return { type: types.DELETE_PLAYER_SUCCESS, payload: player };
  },


  // Get player
  loadPlayer: function(id) {
    return function(dispatch) {
      return PlayerApi
        .getOnePlayer(id)
        .then(player => {
          dispatch(actionsFunction.loadPlayerSuccess(player));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadPlayerSuccess: function(player) {
    return { type: types.GET_PLAYER_SUCCESS, payload: player };
  },

  // Load  list
  loadPlayerList: function() {
    return function(dispatch) {
      return PlayerApi
        .getPlayerList()
        .then(list => {
          dispatch(actionsFunction.loadPlayerListSuccess(list));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadPlayerListSuccess: function(list) {
    return { type: types.LIST_PLAYER_SUCCESS, payload: list };
  },

	
  // Save player
  savePlayer: function(player) {
    return function(dispatch) {
      return PlayerApi
        .savePlayer(player)
        .then(player => {
          dispatch(actionsFunction.savePlayerSuccess(player));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  savePlayerSuccess: function(player) {
    return { type: types.UPDATE_PLAYER_SUCCESS, payload: player };
  },


  /*
  Name: KnockOut
  Description: 
  Params: 
    String PlayerToKnockout - 
  */
  KnockOut: function(...params) {
    return function(dispatch) {
      return PlayerApi
        .KnockOut(params)
        .then( result => {
          dispatch(actionsFunction.KnockOutSuccess(result));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  KnockOutSuccess: function(result) {
    return { type: types.KNOCKOUT_PLAYER_SUCCESS, payload: result };
  },
		
};

export default actionsFunction;
