const router = require("express").Router();

const {
  getAllMenuItems,
  createMenuItem,
  getCurrentCategoryMenu,
} = require("../controllers/menuItems");

router.get("/categories/:params", getCurrentCategoryMenu);
router.get("/", getAllMenuItems);
router.post("/", createMenuItem);

module.exports = router;
