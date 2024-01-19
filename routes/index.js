
const Router = require("express");
const router = new Router();

const usersRouter = require("./usersRouter");
const learnerRouter = require("./learnerRouter");
const expertRouter = require("./expertRouter")

router.use("/users", usersRouter);
router.use("/learner", learnerRouter)
router.use("/expert", expertRouter)

module.exports = router;
