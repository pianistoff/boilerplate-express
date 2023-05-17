require("dotenv").config();
const exp = require("constants");
let express = require("express");
let app = express();
const path = require("path");

const filePath = path.join(__dirname, process.env.FILE_PATH);
const publicPath = path.join(__dirname, process.env.PUBLIC_PATH);

console.log("Hello World");

app.get(
  "/now",
  (req, _, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (_, res) => {
  res.sendFile(filePath);
});

app.use("/public", express.static(publicPath));

app.get("/json", (_, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

module.exports = app;
