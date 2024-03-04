const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["appetizers", "pastas", "pizzas", "desserts", "beverages"],
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
    maxlength: 70,
  },
  link: {
    type: String,
    required: true,
    minlength: 10,
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

module.exports = mongoose.model("menuItem", menuItemSchema);
