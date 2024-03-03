const router = require("express").Router();

const { getAllMenuItems, createMenuItem } = require("../controllers/menuItems");

router.get("/", getAllMenuItems);
router.post("/", createMenuItem);

module.exports = router;
