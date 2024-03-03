const MenuItem = require("../models/menuItem");

//GET ALL ITEM FROM MENU
module.exports.getAllMenuItems = (req, res) => {
  MenuItem.find()
    .then((cards) => res.send(cards))
    .catch((err) => res.status(404).send({ message: err }));
};

//POST NEW ITEM IN MENU
module.exports.createMenuItem = (req, res) => {
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
    .then((menuItem) => res.send(menuItem))
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};
