const router = require("express").Router();

const { getAllCartItems, addToCart } = require("../controllers/cartItems");

router.get("/", getAllCartItems);
router.post("/", addToCart);

module.exports = router;
