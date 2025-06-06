require("dotenv").config();
const exp = require("constants");
let express = require("express");
let app = express();
const path = require("path");
const bodyParser = require("body-parser");

const filePath = path.join(__dirname, process.env.FILE_PATH);
const publicPath = path.join(__dirname, process.env.PUBLIC_PATH);

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/name")
  .get((req, res) => {
    res.send({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.send({ name: `${req.body.first} ${req.body.last}` });
  });

app.get("/:word/echo", (req, res) => {
  res.send({ echo: req.params.word });
});

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
