const url = require("url");
const errorsHandler = require("./errorsHandler");
const BooksController = require("../../application/BooksController");

const pathMatches = new Map([
  [/^\/books$/, handleFindBookList],
  [/^\/books\/(\d+)$/, handleFindBookByIsbn],
  [/^\/books\/(\d+)\/page\/(\d+)$/, handleFindBookPage],
]);

async function handleGetRequests(request, response) {
  const { pathname } = url.parse(request.url);
  for (let [regex, func] of pathMatches) {
    const match = pathname.match(regex);
    if (match) {
      await func(request, ...match.slice(1))
        .then((responseJson) => response.end(responseJson))
        .catch((err) => {
          errorsHandler.handleError(404, response);
        });
    }
  }
}

async function handleFindBookList(request) {
  const controller = BooksController.getInstance();
  const books = await controller.findBooks();
  return JSON.stringify({ books });
}

async function handleFindBookByIsbn(request, isbn) {
  const controller = BooksController.getInstance();
  const book = await controller.findBookByIsbn(isbn);
  return JSON.stringify({ book });
}

async function handleFindBookPage(request, isbn, page) {
  const controller = BooksController.getInstance();
  const querystring = url.parse(request.url, true).query;
  const bookPage = await controller.getBookPage(isbn, page, querystring.format);
  return JSON.stringify({ page: bookPage });
}

module.exports = {
  handleGetRequests,
};
