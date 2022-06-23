// Dependencies
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

// Screens
import LoginScreen from "./Screen/LoginScreen";
import Home from "./Screen/Home";
import Profile from "./Screen/Profile";
import ChangePwd from "./Screen/ChangePwd";

/* START MY SCREENS IMPORT */

import GameEdit from "./Screen/GameEdit";
import GameList from "./Screen/GameList";
import PlayerEdit from "./Screen/PlayerEdit";
import PlayerList from "./Screen/PlayerList";
import TableEdit from "./Screen/TableEdit";
import TableList from "./Screen/TableList";

/* END MY SCREENS IMPORT */

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const AppNavigator = createStackNavigator(
      {
        Login: { screen: LoginScreen },
        Home: { screen: Home },
        Profile: { screen: Profile },
        ChangePwd: { screen: ChangePwd },

        /* START MY SCREENS */

    GameEdit: { screen: GameEdit },
    GameList: { screen: GameList },
    PlayerEdit: { screen: PlayerEdit },
    PlayerList: { screen: PlayerList },
    TableEdit: { screen: TableEdit },
    TableList: { screen: TableList },
    
     /* END MY SCREENS */
      },
      {
        initialRouteName: this.props.user ? "Home" : "Login",
        headerMode: "none"
      }
    );

    const AppContainerRouter = createAppContainer(AppNavigator);

    return <AppContainerRouter />;
  }
}

export default AppContainer;
