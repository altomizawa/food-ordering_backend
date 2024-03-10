const express = require("express");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

const menuRouter = require("./routes/menuItems");
const cartItems = require("./routes/cartItems");
const userRouter = require("./routes/users");

app.use(bodyParser.json());

//setup CORS
app.use(cors());

app.use("/menu", menuRouter);
app.use("/mycart", cartItems);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Database connected");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
