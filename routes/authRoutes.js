const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/complete-registration", authController.completeRegistration);
router.post("/forgot-password", authController.forgetPassword);
router.post("/comfirm-otp", authController.comfirmOtp);
router.post("/reset-password", authController.resetPassword);
module.exports = router;
