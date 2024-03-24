const MenuItem = require("../models/menuItem");

// IMPORT ALL ERROR MESSAGES
const BadRequest = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found-err");

// GET INITIAL Menu
module.exports.getAllMenuItems = async (req, res, next) => {
  try {
    // SEACH FOR ALL ITEMS APPETIZER CATEGORY IN DATABASE
    const menuItems = await MenuItem.find({ category: "appetizers" });

    // LOOK FOR ITEMS IN DATABASE AND RETURN ERROR IF FALSE
    if (!menuItems) {
      throw new NotFoundError("No items found in database");
    }
    // ITEMS FOUND
    return res.status(200).send(menuItems);
  } catch (err) {
    next(err);
  }
};

//CREATE NEW ITEM IN MENU
module.exports.createMenuItem = async (req, res, next) => {
  try {
    // GET ALL VALUES FROM BODY
    const { category, name, description, link, price, onSale, salePrice } =
      req.body;

    // CREATE NEW MENU ITEM
    const menuItem = await MenuItem.create({
      name,
      category,
      description,
      price,
      onSale,
      salePrice,
      link,
    });

    // CHECK IF ITEM HAS BEEN CREATED
    if (!menuItem) {
      throw new BadRequest("Item could not be created");
    }

    // ITEM CREATED. RETURN ITEM
    return res.status(200).send(menuItem);
  } catch (err) {
    next(err);
  }
};

// DELETE ITEM IN MENU
module.exports.deleteMenuItemById = async (req, res, next) => {
  try {
    // GET ALL VALUES FROM BODY
    const { _id } = req.body;

    // CREATE NEW MENU ITEM
    const menuItem = await MenuItem.findByIdAndDelete({ _id: _id });

    // CHECK IF ITEM HAS BEEN CREATED
    if (!menuItem) {
      throw new NotFoundError("Item could not be found");
    }

    // ITEM DELETED. RETURN DELETED ITEM
    return res.status(200).send(menuItem);
  } catch (err) {
    next(err);
  }
};

// GET ALL ITEMS FROM ONE CATEGORY
module.exports.getCurrentCategoryMenu = async (req, res, next) => {
  try {
    // GET CATEGORY
    const category = req.params.id;

    // LOOK FOR CATEGORY IN DATABASE
    const categoryItems = await MenuItem.find({ category: `${category}` });

    // IF CATEGORY IS NOT FOUND
    if (!categoryItems) {
      throw new NotFoundError("category not found in database");
    }

    return res.status(200).json(categoryItems);
  } catch (err) {
    next(err);
  }
};

// GET ITEM BY ID
module.exports.getItemById = async (req, res, next) => {
  try {
    // GET ITEM ID
    const _id = req.params.id;
    // SEARCH FOR ITEM IN DATABASE
    const menuItem = await MenuItem.findById({ _id: _id });
    if (!menuItem) {
      // ITEM NOT FOUND RETURN ERROR
      throw new NotFoundError("category not found in database");
    }
    return res.status(200).json(menuItem); // ITEM FOUND RETURN ITEM
  } catch (err) {
    next(err);
  }
};
