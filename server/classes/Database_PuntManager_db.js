// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_PuntManager_db";
import UserModel from "../models/PuntManager_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.PuntManager_db.host +
        ":" +
        properties.PuntManager_db.port +
        "//" +
        properties.PuntManager_db.user +
        "@" +
        properties.PuntManager_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.PuntManager_db.name,
      properties.PuntManager_db.user,
      properties.PuntManager_db.password,
      {
        host: properties.PuntManager_db.host,
        dialect: properties.PuntManager_db.dialect,
        port: properties.PuntManager_db.port,
        logging: false
      }
    );
    this.dbConnection_PuntManager_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_PuntManager_db;
  }
}

export default new Database();
