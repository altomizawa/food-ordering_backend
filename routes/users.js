const router = require("express").Router();

const {
  createUser,
  getAllUsers,
  getCartItems,
  addItemToCart,
  getUserById,
  deleteUser,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);
// router.delete("/", deleteMenuItemById);
router.get("/cart", getCartItems);
router.post("/cart", addItemToCart);

module.exports = router;
