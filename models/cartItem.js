const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Appetizers", "Pasta", "Pizza", "Dessert", "Beverages"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  link: {
    type: String,
    // required: true,
    // minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  onSale: {
    type: Boolean,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("cartItem", cartItemSchema);
