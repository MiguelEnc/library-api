const { MongoClient } = require("mongodb");
const config = require("../config");

const client = new MongoClient(config.MONGO_URI, { useNewUrlParser: true });

async function connect() {
  try {
    await client.connect();

    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  } finally {
    await client.close();
  }
}

function disconnect() {
  return client.close();
}

module.exports = {
  connect,
  disconnect,
};
