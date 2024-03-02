const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

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
