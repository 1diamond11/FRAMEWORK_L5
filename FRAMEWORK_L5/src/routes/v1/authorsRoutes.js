const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    patchAuthor,
    deleteAuthor
  } = require("../../controllers/authorsController");
  
  module.exports = (app) => {
    app.get("/api/v1/authors", getAllAuthors);
    app.get("/api/v1/authors/:id", getAuthorById);
    app.post("/api/v1/authors", createAuthor);
    app.put("/api/v1/authors/:id", updateAuthor);
    app.patch("/api/v1/authors/:id", patchAuthor);
    app.delete("/api/v1/authors/:id", deleteAuthor);
  };
  