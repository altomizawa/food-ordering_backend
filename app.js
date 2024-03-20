require("dotenv").config();

const express = require("express");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

// IMPORT ROUTES
const menuRouter = require("./routes/menuItems");
const cartItems = require("./routes/cartItems");
const userRouter = require("./routes/users");
const { createUser, signIn } = require("./controllers/users");

//IMPORT MIDDLEWARES
const auth = require("./middleware/auth");

app.use(bodyParser.json());

//setup CORS
app.use(cors());

app.use("/menu", menuRouter);
app.use("/mycart", auth, cartItems);
app.use("/users", auth, userRouter);
app.post("/register", createUser);
app.post("/signin", signIn);

app.get("/", (req, res) => {
  res.send("Database connected");
});

app.use((err, req, res, next) => {
  // if no err.status, show 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "There was a server error" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
