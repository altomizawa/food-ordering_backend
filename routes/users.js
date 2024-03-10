const router = require("express").Router();

const {
  getAllUsers,
  getCartItems,
  addItemToCart,
  getUserById,
  deleteUser,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/cart", getCartItems);
router.post("/cart", addItemToCart);

module.exports = router;
