const express = require("express");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");

//import Object Freeze http
const { HttpStatus, HttpResponseMessage } = require("./enums/http");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

const menuRouter = require("./routes/menuItems");
const cartItems = require("./routes/cartItems");
const userRouter = require("./routes/users");
const { createUser, signIn } = require("./controllers/users");

app.use(bodyParser.json());

//setup CORS
app.use(cors());

app.use("/menu", menuRouter);
app.use("/mycart", cartItems);
app.use("/users", userRouter);
app.post("/register", createUser);
app.post("/signin", signIn);

app.get("/", (req, res) => {
  res.send("Database connected");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
