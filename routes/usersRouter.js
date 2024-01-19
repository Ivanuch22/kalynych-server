const Router = require("express");
const router = new Router();

const userController = require("../controlers/userController");
const authMiddleWare = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/update", authMiddleWare, userController.update);
router.post("/login", userController.login);
router.post("/forgot-password",  userController.forgotPassword);
router.post("/reset-password",  userController.resetPassword);
router.post("/send-verification",  userController.sendVerificatoin);
router.get("/verify/:userid",  userController.authentification);
router.post('/refresh', userController.refreshToken);
router.post('/update-email',authMiddleWare, userController.updateEmail);
router.get("/auth", authMiddleWare, userController.check);

module.exports = router;


