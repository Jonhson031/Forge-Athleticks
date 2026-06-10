import express from "express";
import {
  register,
  login,
  protect,
  getMe,
  forgotPassword,
  resetPassword,
  verifyResetCode,
  updatePassword,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.patch("/resetPassword", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

export default router;
