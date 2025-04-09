const App = require("./lib/framework");
const requestParser = require("./lib/requestParser");
const errorHandler = require("./lib/errorHandler");
const patternsRoutes = require("./src/routes/v1/patternsRoutes");
const authorsRoutes = require("./src/routes/v1/authorsRoutes");

const app = new App();
const PORT = 3000;

app.use(requestParser);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

patternsRoutes(app);
authorsRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});