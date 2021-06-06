const { nanoid } = require("nanoid");

class BookService {
  constructor() {
    this._books = [];
  }

  addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    this._books.push(newBook);
    const isSuccess = this._books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
      throw new Error("Buku gagal ditambahkan");
    }

    return id;
  }

  getBooks() {
    return this._books;
  }

  getBookById(id) {
    const book = this._books.filter((n) => n === id)[0];

    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }

    return book;
  }

  editBookbyId(
    id,
    { name, year, author, summary, publisher, pageCount, readPage, reading }
  ) {
    // validation
    if (readPage > pageCount) {
      throw new Error(
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      );
    }

    const index = this._books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new Error("Gagal memperbarui buku, buku tidak ditemukan");
    }

    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    this._books[index] = {
      ...this._books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };
  }

  deleteBookbyId(id) {
    const index = this._books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new Error("ID buku tidak ditemukan");
    }

    this._books.splice(index, 1);
  }
}

module.exports = BookService;
