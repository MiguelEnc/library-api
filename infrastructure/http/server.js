const http = require("http");
const config = require("../config.js");
const router = require("./bookRoutes");
const utils = require("./utils");
const db = require("../db/db");

const HOST = config.APP_HOST;
const PORT = config.APP_PORT;

db.connect();

const server = http.createServer((request, response) => {
  if (request.method !== "GET") {
    utils.respondError(response, 405);
  } else {
    response.end("ok");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});
