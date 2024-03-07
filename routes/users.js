const router = require("express").Router();

const {
  createUser,
  getAllUsers,
  getCartItems,
  addItemToCart,
} = require("../controllers/users");

router.get("/", getAllUsers);
// router.get('/:id', getItemById);
router.post("/", createUser);
// router.delete("/", deleteMenuItemById);
router.get("/cart", getCartItems);
router.post("/cart", addItemToCart);

module.exports = router;
