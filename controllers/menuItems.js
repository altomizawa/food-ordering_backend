const { restart } = require("nodemon");
const MenuItem = require("../models/menuItem");

//GET INITIAL Menu
module.exports.getAllMenuItems = (req, res) => {
  MenuItem.find({ category: "appetizers" })
    .then((cards) => res.send(cards))
    .catch((err) => res.status(404).send({ message: err }));
};

//POST NEW ITEM IN MENU
module.exports.createMenuItem = (req, res) => {
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

//GET ALL ITEMS FROM ONE CATEGORY
module.exports.getCurrentCategoryMenu = (req, res) => {
  const category = req.params.params;
  MenuItem.find({ category: `${category}` })
    .then((items) => res.send(items))
    .catch((err) => res.status(404).send({ message: err }));
};
