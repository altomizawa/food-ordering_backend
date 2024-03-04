const MenuItem = require("../models/cartItem");

//GET CART ITEMS
module.exports.getAllCartItems = (req, res) => {
  MenuItem.find()
    .then((items) => res.send(items))
    .catch((err) => res.status(404).send({ message: err }));
};

//POST NEW ITEM IN MENU
module.exports.addToCart = (req, res) => {
  console.log(req.body);
  const { category, name, description, link, price, onSale, salePrice } =
    req.body;

  MenuItem.create({
    name,
    category,
    description,
    price,
    onSale,
    salePrice,
    link,
  })
    .then((menuItem) => res.send(menuItem))
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};

//DELETE ITEM IN MENU
module.exports.deleteFromCart = (req, res) => {
  const { _id } = req.body;

  MenuItem.findOneAndDelete({
    _id,
  })
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};
