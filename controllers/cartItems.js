/* eslint-disable linebreak-style */
const User = require('../models/user');
// IMPORT ALL ERROR MESSAGES
const NotFoundError = require('../errors/not-found-err');

// GET CART ITEMS
module.exports.getAllCartItems = async (req, res, next) => {
  try {
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.status(200).json(user.currentOrder);
  } catch (err) {
    next(err);
  }
};

// POST NEW ITEM IN MENU
module.exports.addToCart = async (req, res, next) => {
  try {
    // GET ALL INPUTS FROM BODY
    const {
      category, name, description, link, price, onSale, salePrice,
    } = req.body;
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.currentOrder.push({
      category,
      name,
      description,
      link,
      price,
      onSale,
      salePrice,
    });

    await user.save();

    res.status(200).json(user.currentOrder);
  } catch (err) {
    next(err);
  }
};
