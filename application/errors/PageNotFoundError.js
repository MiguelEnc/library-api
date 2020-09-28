module.exports = class PageNotFoundError extends Error {
  constructor(isbn, page) {
    super(`The book ${isbn} doesn't have a page ${page}.`);
    this.name = "PageNotFoundError";
  }
};
