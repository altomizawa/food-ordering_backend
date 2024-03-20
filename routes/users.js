const router = require("express").Router();
const {celebrate, Joi} = require('celebrate');

const {updateNameObject, updateAvatarObject} = require('../enums/celebrateObjects')

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
router.patch("/:id", celebrate(updateNameObject), editUserProfile);
router.patch("/:id/avatar", celebrate(updateAvatarObject), editAvatar);
// router.get("/cart", getCartItems);
// router.post("/:id/pastorders", addItemtoPastOrders);

module.exports = router;
