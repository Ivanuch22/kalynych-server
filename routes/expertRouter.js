const Router = require("express");
const router = new Router();

const expertController = require("../controlers/expertContoller");
const authMiddleWare = require("../middleware/authMiddleware");

router.post("/create",authMiddleWare, expertController.create);
router.post("/update",authMiddleWare, expertController.update);

module.exports = router;
