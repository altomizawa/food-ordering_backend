const router = require("express").Router();

const {
  getAllCartItems,
  addToCart,
  deleteFromCart,
} = require("../controllers/cartItems");

router.delete("/", deleteFromCart);
router.get("/", getAllCartItems);
router.post("/", addToCart);

module.exports = router;
