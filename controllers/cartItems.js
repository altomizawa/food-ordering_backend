const MenuItem = require("../models/cartItem");
const User = require("../models/user");

const { HttpStatus, HttpResponseMessage } = require("../enums/http");

// GET CART ITEMS
module.exports.getAllCartItems = async (req, res) => {
  try {
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      return res
        .status(HttpResponseMessage.NOT_FOUND)
        .send({ message: HttpResponseMessage.NOT_FOUND });
    }

    res.status(HttpStatus.OK).json(user.currentOrder);
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

// POST NEW ITEM IN MENU
module.exports.addToCart = async (req, res) => {
  try {
    // GET ALL INPUTS FROM BODY
    const { category, name, description, link, price, onSale, salePrice } =
      req.body;
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      return res
        .status(HttpResponseMessage.NOT_FOUND)
        .send({ message: HttpResponseMessage.NOT_FOUND });
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

    res.status(HttpStatus.OK).json(user.currentOrder);
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

// MenuItem.create({
//   category,
//   name,
//   description,
//   link,
//   price,
//   onSale,
//   salePrice,
// })
//   .then((menuItem) => res.status(HttpStatus.OK).send(menuItem))
//   .catch((err) => {
//     res
//       .status(HttpStatus.BAD_REQUEST)
//       .send({ message: HttpResponseMessage.BAD_REQUEST });
//   });

// DELETE ITEM IN MENU
module.exports.deleteFromCart = (req, res) => {
  const { _id } = req.body;

  MenuItem.findOneAndDelete({
    _id,
  })
    .then((deletedCard) => res.status(HttpStatus.OK).send(deletedCard))
    .catch((err) => {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: HttpResponseMessage.NOT_FOUND });
    });
};
