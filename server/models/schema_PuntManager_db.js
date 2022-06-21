// Import Sequelize
import Sequelize from "sequelize";
import Database from "../classes/Database_PuntManager_db";

export default init => {
  let sequelize = Database.getConnection();


    /**
      * ------------------------------------
      * Start define generated schema
      *
      * The content of this section will be overwritten on each documentation, 
      * please insert your customization at the top or at the end of the file.
      * ------------------------------------
      */



    /**
      * ------------------------------------
      * Game
      * ------------------------------------
      */
    class Game extends Sequelize.Model{}
    Game.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      Status: {
        type: Sequelize.FLOAT, 
        allowNull: false
      },
      
      TableList: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      GameTables:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Table",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "game", timestamps: false }
    );



    /**
      * ------------------------------------
      * Player
      * ------------------------------------
      */
    class Player extends Sequelize.Model{}
    Player.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      Added: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      CasinoPlayerID: {
        type: Sequelize.STRING
      },
      
      FirstTimePlayer: {
        type: Sequelize.BOOLEAN, 
        allowNull: false
      },
      
      FullName: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
        
      
      
      //EXTERNAL RELATIONS
      /*
      TablePlayer: {
        type: Sequelize.INTEGER,
        references: {
          model: Table,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "player", timestamps: false }
    );



    /**
      * ------------------------------------
      * Table
      * ------------------------------------
      */
    class Table extends Sequelize.Model{}
    Table.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      PlayersList: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
        
        
      TablePlayer:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Player",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      GameTables: {
        type: Sequelize.INTEGER,
        references: {
          model: Game,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "table", timestamps: false }
    );



    /**
      * ------------------------------------
      * User
      * ------------------------------------
      */
    class User extends Sequelize.Model{}
    User.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      mail: {
        type: Sequelize.STRING
      },
      
      name: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      surname: {
        type: Sequelize.STRING
      },
      
      username: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "user", timestamps: false }
    );


    /**
      * ------------------------------------
      * Relations many to many
      * ------------------------------------
      */

    
    
    
    
  /**
   * ------------------------------------
   * End define generated schema
      * ------------------------------------
      */

    /**
      * ------------------------------------
      * Roles
      * ------------------------------------
      */
    class Roles extends Sequelize.Model{}
    Roles.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      role: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      _user:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      }
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "roles", timestamps: false }
    );

    User.hasMany(Roles, {
      foreignKey: "_user"
    });

    /**
      * ------------------------------------
      * Insert here your custom models
      * ------------------------------------
      */

};
