class BooksHandler {
  constructor(service) {
    this._service = service;

    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.putBookByIdHandler = this.putBookByIdHandler.bind(this);
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this);
  }

  postBookHandler(request, h) {
    try {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = request.payload;

      const bookId = this._service.addBook({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      });

      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId,
        },
      });
      response.code = 201;
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getBooksHandler() {
    const books = this._service.getBooks();
    return {
      status: "success",
      data: {
        books,
      },
    };
  }
  getBookByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const book = this._service.getBookById(id);
      return {
        status: "success",
        data: {
          book,
        },
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  putBookByIdHandler(request, h) {
    try {
      this._service.editBookById(id, request.payload);
      return {
        status: "success",
        message: "Buku berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  deleteBookByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteBookById(id);
      return {
        status: "success",
        message: "Buku berhasil dihapus",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = BooksHandler;
