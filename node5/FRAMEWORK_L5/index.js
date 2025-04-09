const App = require("./lib/framework");

const app = new App();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello, JSON!" });
});

app.get("/status", (req, res) => {
  res.status(201).json({ status: "Created" });
});


