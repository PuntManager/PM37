import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Title,
  Container,
  Content,
  Body,
  Button,
  Text,
  Icon,
  Right,
  Left,
  Form,
  ListItem,
  Item,
  Label,
  Input,
  DatePicker,
  Switch,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import PlayerActions from "../redux/actions/PlayerActions";
import TableActions from "../redux/actions/TableActions";

// END IMPORT ACTIONS

/** APIs

* actionsPlayer.create
*	@description CRUD ACTION create
*
* actionsPlayer.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsPlayer.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsTable.findByTablePlayer
*	@description CRUD ACTION findByTablePlayer
*	@param Objectid key - Id of model to search for
*

**/


class PlayerEdit extends Component {
  
  // Init player
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      authorized: false
    };
  }

  // Load data on start
  componentWillMount() {

    this.props.navigation.addListener("willFocus", async () => { 
      // Check security
      if (await SecurityService.isAuth([  ])) {
        this.setState({ authorized: true });
      } else {
        this.props.navigation.navigate("Login", {
          showError: "Not authorized"
        });
        return;
      }


      // Load data
      const itemId = this.props.navigation.getParam("id", "new");
      if (itemId !== "new") {
        this.props.actionsPlayer.loadPlayer(itemId);
        this.props.actionsTable.findByTablePlayer(itemId);
      } else {
        this.setState({
          player: {}
        });
      }
      
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      player: {}
    });
    this.props.actionsPlayer.reset();
  }

  // Insert props player in state
  componentWillReceiveProps(props) {
    this.setState({
      player: props.player
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.player.Added || this.state.player.Added.trim() === "") {
      errors.Added = true;
    }
    
    if (!this.state.player.FirstTimePlayer || this.state.player.FirstTimePlayer.trim() === "") {
      errors.FirstTimePlayer = true;
    }
    
    if (!this.state.player.FullName || this.state.player.FullName.trim() === "") {
      errors.FullName = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.player._id) {
      // Edit
      this.props.actionsPlayer.savePlayer(this.state.player).then(data => {
        this.props.navigation.navigate("PlayerList");
      });
    } else {
      // Create
      this.props.actionsPlayer.createPlayer(this.state.player).then(data => {
        this.props.navigation.navigate("PlayerList");
      });
    }
  }

  // Show content
  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detail Player</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel {...(this.state.errors && this.state.errors.Added === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.Added === true ? { style: styles.validatorLabel } : {})}>
                Added *
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.player.Added }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.player, { Added: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors.Added === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            
            <Item floatingLabel>
              <Label>
                CasinoPlayerID
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.player, { CasinoPlayerID: value }))
                }
                value={this.state.player.CasinoPlayerID && this.state.player.CasinoPlayerID.toString()}
              />
            </Item>
          
            <ListItem>
              <Left>
                <Label>FirstTimePlayer *</Label>
              </Left>
              <Right>
                <Switch
                  value={this.state.player.FirstTimePlayer }
                  onValueChange={value =>
                    this.setState(Object.assign(this.state.player, { FirstTimePlayer: value }))
                  }
                />
              </Right>
            </ListItem>
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.FullName === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.FullName === true ? { style: styles.validatorLabel } : {})}>
                FullName *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.player, { FullName: value }))
                }
                value={this.state.player.FullName && this.state.player.FullName.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.FullName === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                PlayerWallet
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.player, { PlayerWallet: value }))
                }
                value={this.state.player.PlayerWallet && this.state.player.PlayerWallet.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Table */}

          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsPlayer: bindActionCreators(PlayerActions, dispatch),
    actionsTable: bindActionCreators(TableActions, dispatch),
  };
};

// Validate types
PlayerEdit.propTypes = { 
  actionsPlayer: PropTypes.object.isRequired,
  actionsTable: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    player: state.PlayerEditReducer.player,
    listTable: state.PlayerEditReducer.listTable
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
