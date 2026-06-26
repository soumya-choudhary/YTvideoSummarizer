import express from "express";
import { signup, login, loginGoogle } from "../controllers/auth.controller.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    loginGoogle,
);

export default router;
