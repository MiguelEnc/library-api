const http = require("http");
const config = require("../config.js");
const router = require("./bookRoutes");
const errorsHandler = require("./errorsHandler");

module.exports = class Server {
  constructor() {
    this.host = config.get("host");
    this.port = config.get("port");
  }

  start() {
    const server = http.createServer((request, response) => {
      response.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
      });
      if (request.method !== "GET") {
        errorsHandler.handleError(405, response);
      } else {
        router.handleGetRequests(request, response);
      }
    });

    server.listen(this.port, this.host, () => {
      console.log(`Server started on ${this.host}:${this.port}`);
    });
  }
};
