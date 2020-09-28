module.exports = class BookListNotFoundError extends Error {
  constructor() {
    super("No books were found on repositories.");
    this.name = "BookListNotFoundError";
  }
};
