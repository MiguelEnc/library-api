const BookNotFoundError = require("./errors/BookNotFoundError");
const FormatNotSupportedError = require("./errors/FormatNotSupportedError");
const PageNotFoundError = require("./errors/PageNotFoundError");
const BookListNotFoundError = require("./errors/BookListNotFoundError");

module.exports = class BooksController {
  constructor() {
    this.repositories = [];
  }

  static getInstance() {
    if (!BooksController.instance) {
      BooksController.instance = new BooksController();
    }
    return BooksController.instance;
  }

  addRepository(repository) {
    this.repositories.push(repository);
  }

  async findBooks() {
    return await Promise.all(
      this.repositories.map(async (repo) => {
        const books = await repo.findBooks();

        if (books.length > 0) {
          return books.map((book) => ({
            title: book.title,
            isbn: book.isbn,
          }));
        } else {
          throw new BookListNotFoundError();
        }
      })
    );
  }

  async findBookByIsbn(isbn) {
    for (let repo of this.repositories) {
      const book = await repo.findBookByIsbn(isbn);
      if (book) {
        return book;
      }
    }
    throw new BookNotFoundError(isbn);
  }

  async getBookPage(isbn, requestedPage, requestedFormat) {
    if (requestedPage <= 0) throw new PageNotFoundError(isbn, requestedPage);

    for (let repo of this.repositories) {
      const book = await repo.findBookByIsbn(isbn);
      if (book) {
        const formatAvailable = book.formats.filter(
          (f) => f === requestedFormat
        );

        console.log(requestedFormat);
        if (!formatAvailable) {
          throw new FormatNotSupportedError(book.title, requestedFormat);
        }

        const page = await repo.getBookPage(
          isbn,
          requestedPage,
          requestedFormat
        );
        if (page) {
          return page;
        }
      }
    }

    throw new PageNotFoundError(isbn, requestedPage);
  }
};
