const BooksController = require("./application/BooksController");
const Server = require("./infrastructure/http/Server");
const config = require("./infrastructure/config");

const controller = BooksController.getInstance();

for (let path of config.get("REPOSITORIES")) {
  const Repository = require(path);
  controller.addRepository(new Repository());
}

const server = new Server();
server.start();
