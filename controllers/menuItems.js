const MenuItem = require("../models/menuItem");

//GET INITIAL Menu
module.exports.getAllMenuItems = async (req, res) => {
  try {
    // SEACH FOR ALL ITEMS APPETIZER CATEGORY IN DATABASE
    const menuItems = await MenuItem.find({ category: 'appetizers' });

    // LOOK FOR ITEMS IN DATABASE AND RETURN ERROR IF FALSE
    if (!menuItems) {
      return res.status(404).send({message: 'no items in database'})
    }
    //ITEMS FOUND
    return res.status(200).send(menuItems);
    } catch (err) {console.log(err)}
};

//CREATE NEW ITEM IN MENU
module.exports.createMenuItem = async (req, res) => {
  try {
    // GET ALL VALUES FROM BODY
    const { category, name, description, link, price, onSale, salePrice } =
    req.body;
    
    //CREATE NEW MENU ITEM
    const menuItem = await MenuItem.create ({ 
      name,
      category,
      description,
      price,
      onSale,
      salePrice,
      link
    })

    // CHECK IF ITEM HAS BEEN CREATED
    if (!menuItem) {
      return res.status(500).send("Couldn't create item in Database")
    }

    //ITEM CREATED. RETURN ITEM
    return res.status(200).send(menuItem);
  } catch (err) {res.status(500).send(`Error: ${err}`)}
};

// DELETE ITEM IN MENU
module.exports.deleteMenuItemById = async (req, res) => {
  try {
    // GET ALL VALUES FROM BODY
    const { _id } =
    req.body;
    
    //CREATE NEW MENU ITEM
    const menuItem = await MenuItem.findByIdAndDelete({_id: _id})

    // CHECK IF ITEM HAS BEEN CREATED
    if (!menuItem) {
      return res.status(500).send("Couldn't find item in Database")
    }

    //ITEM DELETED. RETURN DELETED ITEM
    return res.status(200).send(menuItem);
  } catch (err) {res.status(500).send(`Error: ${err}`)}
};

//GET ALL ITEMS FROM ONE CATEGORY
module.exports.getCurrentCategoryMenu = async (req, res) => {
  try{
    // GET CATEGORY
    const category = req.params.id;

    // LOOK FOR CATEGORY IN DATABASE
    const categoryItems = await MenuItem.find({ category: `${category}` })
    
    //IF CATEGORY IS NOT FOUND
    if (!categoryItems) {
      return res.status(400).send('message: category not found in database')
    }

    return res.status(200).json(categoryItems)
  } catch (err) {console.log(err)}
};

// GET ITEM BY ID
module.exports.getItemById = async (req, res) => {
  try {
  // GET ITEM ID
  const _id = req.params.id;
  // SEARCH FOR ITEM IN DATABASE
  const menuItem = await MenuItem.findById({_id: _id})
  if (!menuItem) { //ITEM NOT FOUND RETURN ERROR
    return res.status(404).send('item not found in database')
  }
  return res.status(200).json(menuItem); //ITEM FOUND RETURN ITEM
  } catch (err) {console.log(err)
  }
} 
