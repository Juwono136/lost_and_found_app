const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Sign up a new user (POST /signup)
router.post("/signup", authController.signup);

// Sign in an existing user (POST /signin)
router.post("/signin", authController.signin);

// Refresh authentication token (POST /refresh)
router.post("/refresh", authController.refreshToken);

// Get user information (GET /user_infor)
router.get("/user_infor", authController.getCurrentUser);

// Get information on all users (GET /all_infor)
router.get("/all_infor", authController.getAllUsers);

// logout (GET /logout)
router.get("/logout", authController.logout);

// request password reset (POST /forgot)
router.post("/forgot", authController.forgotPassword);

// update user (PUT /update_user)
router.put("/update_user", authController.updateUser);

// reset password (PUT /reset)
router.put("/resetPassword", authController.resetPassword);


module.exports = router;
