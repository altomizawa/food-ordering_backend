const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

const menuRouter = require("./routes/menuItems");

app.use(bodyParser.json());

app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.get("/users", (req, res) => {
  res.send({
    name: "Al Tomizawa",
    age: "42",
  });
});

app.get("/users/:id", (req, res) => {
  res.send(req.params);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
