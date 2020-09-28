const MongoConnector = require("../db/MongoConnector");
const Book = require("../../domain/Book");
const Page = require("../../domain/Page");

module.exports = class LocalBookRepository {
  constructor() {
    this.dbClient = new MongoConnector();
    this.connect();
  }

  async findBooks() {
    const options = {
      sort: { title: 1 },
    };

    const books = await this.collection
      .find({}, options)
      .project({ _id: 0, title: 1, isbn13: 1 })
      .toArray();

    return books.map((book) => new Book(book.title, book.isbn13));
  }

  async findBookByIsbn(isbn) {
    const aggregatePipeline = [
      {
        $match: {
          isbn13: isbn,
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          isbn13: 1,
          edition: 1,
          author: 1,
          publisher: 1,
          description: 1,
          pages: 1,
          formats: {
            $map: {
              input: {
                $objectToArray: "$formats",
              },
              as: "item",
              in: "$$item.k",
            },
          },
        },
      },
    ];

    const matchedBooks = await this.collection
      .aggregate(aggregatePipeline)
      .toArray();

    if (matchedBooks.length === 0) {
      return null;
    }

    const book = matchedBooks[0];
    return new Book(
      book.title,
      book.isbn13,
      book.author,
      book.publisher,
      book.description,
      book.pagesCount,
      book.formats
    );
  }

  async getBookPage(isbn, page, format) {
    const aggregatePipeline = [
      {
        $match: {
          isbn13: isbn,
        },
      },
      {
        $project: {
          _id: 0,
          content: {
            $arrayElemAt: [`$formats.${format}`, page - 1],
          },
        },
      },
    ];
    const aggregateResult = await this.collection
      .aggregate(aggregatePipeline)
      .toArray();

    if (aggregateResult.length === 0) {
      return null;
    }

    const bookPage = aggregateResult[0];
    return new Page(isbn, bookPage.content);
  }

  async connect() {
    this.collection = await this.dbClient.connect();
  }

  disconnect() {
    this.dbClient.disconnect();
  }
};
