const router = require("express").Router();

const {
  getAllUsers,
  // getCartItems,
  // addItemToCart,
  getUserById,
  deleteUser,
  getMyProfile,
  editUserProfile
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/me", getMyProfile);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch('/:id', editUserProfile)
// router.get("/cart", getCartItems);
// router.post("/cart", addItemToCart);

module.exports = router;
