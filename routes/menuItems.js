const router = require("express").Router();

const {
  getAllMenuItems,
  createMenuItem,
  getCurrentCategoryMenu,
  getItemById,
  deleteMenuItemById
} = require("../controllers/menuItems");

router.get("/categories/:id", getCurrentCategoryMenu);
router.get("/", getAllMenuItems);
router.get('/:id', getItemById)
router.post("/", createMenuItem);
router.delete("/", deleteMenuItemById);

module.exports = router;
