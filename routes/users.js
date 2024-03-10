const router = require("express").Router();

const {
  getAllUsers,
  getCartItems,
  addItemToCart,
  getUserById,
  deleteUser,
  getMyProfile,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/me", getMyProfile);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/cart", getCartItems);
router.post("/cart", addItemToCart);

module.exports = router;
