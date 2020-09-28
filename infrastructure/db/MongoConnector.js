const { MongoClient } = require("mongodb");
const config = require("../config");

module.exports = class MongoConnector {
  constructor() {
    this.client = new MongoClient(config.get("dbURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    this.disconnect();

    try {
      await this.client.connect();
      console.log("Successfully connected to database");

      return this.client.db(config.get("dbName")).collection("books");
    } catch (err) {
      console.error("Error connecting to database", err);
    }
  }

  disconnect() {
    this.client.close();
  }
};
