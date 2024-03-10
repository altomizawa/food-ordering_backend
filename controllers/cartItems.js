const MenuItem = require("../models/cartItem");

const { HttpStatus, HttpResponseMessage } = require("../enums/http");

// GET CART ITEMS
module.exports.getAllCartItems = (req, res) => {
  MenuItem.find()
    .then((items) => res.status(HttpStatus.OK).send(items))
    .catch((err) =>
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: HttpResponseMessage.BAD_REQUEST })
    );
};

// POST NEW ITEM IN MENU
module.exports.addToCart = (req, res) => {
  const { category, name, description, link, price, onSale, salePrice } =
    req.body;
  MenuItem.create({
    category,
    name,
    description,
    link,
    price,
    onSale,
    salePrice,
  })
    .then((menuItem) => res.status(HttpStatus.OK).send(menuItem))
    .catch((err) => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: HttpResponseMessage.BAD_REQUEST });
    });
};

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
