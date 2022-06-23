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
  Picker,
  DatePicker,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import GameActions from "../redux/actions/GameActions";
import TableActions from "../redux/actions/TableActions";

// END IMPORT ACTIONS

/** APIs

* actionsGame.create
*	@description CRUD ACTION create
*
* actionsGame.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsGame.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsTable.list
*	@description CRUD ACTION list
*

**/


class GameEdit extends Component {
  
  // Init game
  constructor(props) {
    super(props);
    this.state = {
      game: {},
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
        this.props.actionsGame.loadGame(itemId);
      } else {
        this.setState({
          game: {}
        });
      }
      
      this.props.actionsTable.loadTableList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      game: {}
    });
    this.props.actionsGame.reset();
  }

  // Insert props game in state
  componentWillReceiveProps(props) {
    this.setState({
      game: props.game
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.game.Started || this.state.game.Started.trim() === "") {
      errors.Started = true;
    }
    
    if (!this.state.game.Status || this.state.game.Status.trim() === "") {
      errors.Status = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.game._id) {
      // Edit
      this.props.actionsGame.saveGame(this.state.game).then(data => {
        this.props.navigation.navigate("GameList");
      });
    } else {
      // Create
      this.props.actionsGame.createGame(this.state.game).then(data => {
        this.props.navigation.navigate("GameList");
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
            <Title>Detail Game</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            
            <Item floatingLabel>
              <Label>
                BuyInAmount
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.game, { BuyInAmount: value }))
                }
                value={this.state.game.BuyInAmount && this.state.game.BuyInAmount.toString()}
              />
            </Item>
          
            <Item stackedLabel {...(this.state.errors && this.state.errors.Started === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.Started === true ? { style: styles.validatorLabel } : {})}>
                Started *
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.game.Started }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.game, { Started: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors.Started === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.Status === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.Status === true ? { style: styles.validatorLabel } : {})}>
                Status *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.game, { Status: value }))
                }
                value={this.state.game.Status && this.state.game.Status.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.Status === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            <Item stackedLabel>
              <Label>
                Stopped
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.game.Stopped }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.game, { Stopped: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel>
              <Label>
                TableList
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.game, { TableList: value }))
                }
                value={this.state.game.TableList && this.state.game.TableList.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* Relation 1:m GameTables with Table */}
          
          <Item stackedLabel>
            <Label >
              GameTables
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.game.GameTables }
              value={this.state.game.GameTables }
              onValueChange={value =>
                this.setState(Object.assign(this.state.game, { GameTables: value }))
              }
            >
              {this.props.listTable &&
                this.props.listTable.map(row => (
                  <Picker.Item label={row._id} value={row._id} key={row._id}>
                    {row._id}
                  </Picker.Item>
                ))}
            </Picker>
          </Item>
          
          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsGame: bindActionCreators(GameActions, dispatch),
    actionsTable: bindActionCreators(TableActions, dispatch),
  };
};

// Validate types
GameEdit.propTypes = { 
  actionsGame: PropTypes.object.isRequired,
  actionsTable: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    game: state.GameEditReducer.game,
    listTable: state.GameEditReducer.listTable
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
