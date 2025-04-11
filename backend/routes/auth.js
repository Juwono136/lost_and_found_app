const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/refresh", authController.refreshToken);
router.get("/user_infor", authController.getCurrentUser);
router.get("/all_infor", authController.getAllUsers);
router.get("/logout", authController.logout);
router.post("/forgot", authController.forgotPassword);
router.put("/update_user", authController.updateUser);

module.exports = router;
