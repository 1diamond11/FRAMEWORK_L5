const fs = require("fs");
const path = require("path");

function read(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf-8"));
}

function write(file, data) {
  fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2));
}

module.exports = { read, write };