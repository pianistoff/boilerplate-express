let express = require("express");
let app = express();
const path = require("path");

const filePath = path.join(__dirname, process.env.FILE_PATH);

console.log("Hello World");

app.get("/", (_, res) => {
  res.sendFile(filePath);
});

module.exports = app;
