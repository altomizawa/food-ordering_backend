const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

const menuRouter = require("./routes/menuItems");
const cartItems = require("./routes/cartItems");

app.use(bodyParser.json());

//setup CORS
app.use(cors());

app.use("/menu", menuRouter);
app.use("/mycart", cartItems);

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
