import PlayerWalletModelGenerated from "./generated/PlayerWalletModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await PlayerWalletModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...PlayerWalletModelGenerated,
  ...customModel
};
