const { read, write } = require("../db/db");
const FILE = "patterns.json";

function getAllPatterns(req, res) {
  const patterns = read(FILE);
  res.json(patterns);
}

function getPatternById(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const patterns = read(FILE);
  const pattern = patterns.find(p => p.id === id);
  pattern ? res.json(pattern) : res.status(404).json({ error: "Not found" });
}

function createPattern(req, res) {
  const patterns = read(FILE);
  const newPattern = { id: Date.now(), ...req.body };
  patterns.push(newPattern);
  write(FILE, patterns);
  res.status(201).json(newPattern);
}

function updatePattern(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const patterns = read(FILE);
  const index = patterns.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  patterns[index] = { id, ...req.body };
  write(FILE, patterns);
  res.json(patterns[index]);
}

function patchPattern(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const patterns = read(FILE);
  const index = patterns.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  patterns[index] = { ...patterns[index], ...req.body };
  write(FILE, patterns);
  res.json(patterns[index]);
}

function deletePattern(req, res) {
  const id = parseInt(req.url.split("/").pop());
  const patterns = read(FILE);
  const filtered = patterns.filter(p => p.id !== id);
  write(FILE, filtered);
  res.json({ message: "Deleted" });
}

module.exports = {
  getAllPatterns,
  getPatternById,
  createPattern,
  updatePattern,
  patchPattern,
  deletePattern
};
