const router = require("express").Router();

const {
  getAllUsers,
  // getCartItems,
  // addItemToCart,
  getUserById,
  deleteUser,
  getMyProfile,
  editUserProfile,
  editAvatar,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/me", getMyProfile);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id", editUserProfile);
router.patch("/:id/avatar", editAvatar);
// router.get("/cart", getCartItems);
// router.post("/:id/pastorders", addItemtoPastOrders);

module.exports = router;
