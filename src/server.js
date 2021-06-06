const Hapi = require("@hapi/hapi");

const books = require("./api/books");
const BookService = require("./services/inMemory/BooksService");

const init = async () => {
  const bookService = new BookService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: books,
    options: {
      service: bookService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
