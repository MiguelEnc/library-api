class Book {
  constructor(
    title = "",
    isbn = "",
    author = "",
    publisher = "",
    description = "",
    pagesCount = 0,
    formats = []
  ) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.publisher = publisher;
    this.description = description;
    this.pagesCount = pagesCount;
    this.formats = formats;
  }
}

module.exports = Book;
