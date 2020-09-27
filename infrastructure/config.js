const APP_HOST = process.env.HOST || "localhost";
const APP_PORT = process.env.PORT || 3000;

const DB_USER = process.env.DB_USER || "gbh";
const DB_PASS = process.env.DB_PASS || "gbp_pass";
const DB_NAME = process.env.DB_NAME || "Library";

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@librarycluster.zul9l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
  APP_HOST,
  APP_PORT,
  MONGO_URI,
};
