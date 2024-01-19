const Router = require("express");
const router = new Router();

const learnerController = require("../controlers/learnerController");
const authMiddleWare = require("../middleware/authMiddleware");

router.post("/create",authMiddleWare, learnerController.create);
router.post("/update",authMiddleWare, learnerController.update);

module.exports = router;
