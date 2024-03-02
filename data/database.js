const mongoose = require("mongoose");

module.exports = async function connectDatabase() {
  await mongoose.connect("mongodb://127.0.0.1/restaurant-app");
  console.log("Database connected");
};
