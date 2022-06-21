import PlayerModelGenerated from "./generated/PlayerModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await PlayerModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...PlayerModelGenerated,
  ...customModel
};
