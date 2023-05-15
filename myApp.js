let express = require("express");
let app = express();
const path = require("path");

const filePath = path.join(__dirname, process.env.FILE_PATH);
const publicPath = path.join(__dirname, process.env.PUBLIC_PATH);

console.log("Hello World");

app.get("/", (_, res) => {
  res.sendFile(filePath);
});

app.use("/public", express.static(publicPath));

app.get("/json", (_, res) => {
  res.json({ message: "Hello json" });
});

module.exports = app;
