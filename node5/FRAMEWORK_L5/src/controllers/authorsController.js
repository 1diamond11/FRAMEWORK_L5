const { read, write } = require("../db/db");
const FILE = "authors.json";

function getAllAuthors(req, res) {
  const authors = read(FILE);
  res.json(authors);
}

function getAuthorById(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const authors = read(FILE);
  const author = authors.find(p => p.id === id);
  author ? res.json(author) : res.status(404).json({ error: "Not found" });
}

function createAuthor(req, res) {
  const authors = read(FILE);
  const newAuthor = { id: Date.now(), ...req.body };
  authors.push(newAuthor);
  write(FILE, authors);
  res.status(201).json(newAuthor);
}

function updateAuthor(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const authors = read(FILE);
  const index = authors.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  authors[index] = { id, ...req.body };
  write(FILE, authors);
  res.json(authors[index]);
}

function patchAuthor(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const authors = read(FILE);
  const index = authors.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  authors[index] = { ...authors[index], ...req.body };
  write(FILE, authors);
  res.json(authors[index]);
}

function deleteAuthor(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const authors = read(FILE);
  const filtered = authors.filter(p => p.id !== id);
  write(FILE, filtered);
  res.json({ message: "Deleted" });
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  patchAuthor,
  deleteAuthor
};
