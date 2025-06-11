import express from "express";
import passport from "passport";
import {
  signup,
  login,
  requestPasswordReset,
  resetPassword,
  getUserDetails,
} from "../controllers/authController.js";
import { validateSignup } from "../middlewares/validateSignup.js";

const router = express.Router();

// Local Auth
router.post("/signup", validateSignup, signup);
router.post("/login", login);
router.post("/password-reset", requestPasswordReset);
router.post("/reset-password/:userId/:token", resetPassword);
router.get("/user-details", getUserDetails);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

export default router;
