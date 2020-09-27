class Book {
  constructor(
    title,
    isbn,
    author,
    publisher,
    description,
    pagesCount,
    formats,
    pages
  ) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.publisher = publisher;
    this.description = description;
    this.pagesCount = pagesCount;
    this.formats = formats;
    this.pages = pages;
  }
}

module.exports = Book;
