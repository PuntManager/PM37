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
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import TableActions from "../redux/actions/TableActions";
import PlayerActions from "../redux/actions/PlayerActions";
import GameActions from "../redux/actions/GameActions";

// END IMPORT ACTIONS

/** APIs

* actionsTable.create
*	@description CRUD ACTION create
*
* actionsTable.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsTable.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsPlayer.list
*	@description CRUD ACTION list
*
* actionsGame.findByGameTables
*	@description CRUD ACTION findByGameTables
*	@param Objectid key - Id of model to search for
*

**/


class TableEdit extends Component {
  
  // Init table
  constructor(props) {
    super(props);
    this.state = {
      table: {},
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
        this.props.actionsTable.loadTable(itemId);
        this.props.actionsGame.findByGameTables(itemId);
      } else {
        this.setState({
          table: {}
        });
      }
      
      this.props.actionsPlayer.loadPlayerList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      table: {}
    });
    this.props.actionsTable.reset();
  }

  // Insert props table in state
  componentWillReceiveProps(props) {
    this.setState({
      table: props.table
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.table.PlayersList || this.state.table.PlayersList.trim() === "") {
      errors.PlayersList = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.table._id) {
      // Edit
      this.props.actionsTable.saveTable(this.state.table).then(data => {
        this.props.navigation.navigate("TableList");
      });
    } else {
      // Create
      this.props.actionsTable.createTable(this.state.table).then(data => {
        this.props.navigation.navigate("TableList");
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
            <Title>Detail Table</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.PlayersList === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.PlayersList === true ? { style: styles.validatorLabel } : {})}>
                PlayersList *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.table, { PlayersList: value }))
                }
                value={this.state.table.PlayersList && this.state.table.PlayersList.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.PlayersList === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                TablePool
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.table, { TablePool: value }))
                }
                value={this.state.table.TablePool && this.state.table.TablePool.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                TablePot
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.table, { TablePot: value }))
                }
                value={this.state.table.TablePot && this.state.table.TablePot.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* Relation 1:m TablePlayer with Player */}
          
          <Item stackedLabel>
            <Label >
              TablePlayer
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.table.TablePlayer }
              value={this.state.table.TablePlayer }
              onValueChange={value =>
                this.setState(Object.assign(this.state.table, { TablePlayer: value }))
              }
            >
              {this.props.listPlayer &&
                this.props.listPlayer.map(row => (
                  <Picker.Item label={row._id} value={row._id} key={row._id}>
                    {row._id}
                  </Picker.Item>
                ))}
            </Picker>
          </Item>
          
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Game */}

          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsTable: bindActionCreators(TableActions, dispatch),
    actionsPlayer: bindActionCreators(PlayerActions, dispatch),
    actionsGame: bindActionCreators(GameActions, dispatch),
  };
};

// Validate types
TableEdit.propTypes = { 
  actionsTable: PropTypes.object.isRequired,
  actionsPlayer: PropTypes.object.isRequired,
  actionsGame: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    table: state.TableEditReducer.table,
    listPlayer: state.TableEditReducer.listPlayer,
    listGame: state.TableEditReducer.listGame
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
