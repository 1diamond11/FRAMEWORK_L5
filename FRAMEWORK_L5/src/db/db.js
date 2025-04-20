const fs = require('fs');
const path = require('path');

function readJSON(file) {
  const filePath = path.join(__dirname, file);
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeJSON(file, data) {
  const filePath = path.join(__dirname, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };
