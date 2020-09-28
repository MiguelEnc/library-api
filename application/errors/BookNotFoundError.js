module.exports = class BookNotFoundError extends Error {
  constructor(isbn) {
    super(`A book with ISBN ${isbn} was not found`);
    this.name = "BookNotFoundError";
  }
};
