const books = require("../data/books");

const booksName = (h, name) => {
  const response = h.response({
    status: "success",
    data: {
      books: books
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
    },
  });
  response.code(200);
  return response;
};

const booksReading = (h, reading) => {
  let bookRead;
  if (reading == 1) {
    bookRead = books
      .filter((book) => book.reading === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  } else {
    bookRead = books
      .filter((book) => book.reading === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }
  const response = h.response({
    status: "success",
    data: { books: bookRead },
  });
  response.code(200);
  return response;
};

const booksFinished = (h, finished) => {
  let bookFinished;
  if (finished == 1) {
    bookFinished = books
      .filter((book) => book.finished === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  } else {
    bookFinished = books
      .filter((book) => book.finished === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }
  const response = h.response({
    status: "success",
    data: {
      books: bookFinished,
    },
  });
  response.code(200);
  return response;
};

const booksAll = (h) => {
  const response = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

module.exports = {
  booksName,
  booksReading,
  booksFinished,
  booksAll,
};
