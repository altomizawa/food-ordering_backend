/* eslint-disable quotes */
require("dotenv").config();

const express = require("express");
const connectDatabase = require("./data/database");
const bodyParser = require("body-parser");

// CELEBRATE VALIDATION IMPORTS
const { celebrate, errors } = require("celebrate");
const { signInObject, signUpObject } = require("./enums/celebrateObjects.js"); // OBJECTS FOR CELEBRATE VALIDATION
// WINSTON LOGGER IMPORT
const { requestLogger, errorLogger } = require('./middleware/logger.js')

const app = express();

const { PORT = 3000 } = process.env;

connectDatabase();

// IMPORT ROUTES
const menuRouter = require("./routes/menuItems");
const cartItems = require("./routes/cartItems");
const userRouter = require("./routes/users");
const { createUser, signIn } = require("./controllers/users");

// IMPORT MIDDLEWARES
const auth = require("./middleware/auth");
const cors = require("./middleware/cors");

app.use(bodyParser.json());

// SETUP CORS
app.use(cors); // ENABLE CORS MIDDLEWARE

app.use(requestLogger); // ADD REQUEST LOGGER

app.use("/menu", menuRouter);
app.use("/mycart", auth, cartItems);
app.use("/users", auth, userRouter);
app.post("/register", celebrate(signUpObject), createUser);
app.post("/signin", celebrate(signInObject), signIn);

app.get("/", (req, res) => {
  res.send("Database connected");
});

app.use(errorLogger); // SAVE ERROR LOGS

app.use(errors()); // CATCH CELEBRATE ERRORS

// CATCH CENTRALIZED ERRORS
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
