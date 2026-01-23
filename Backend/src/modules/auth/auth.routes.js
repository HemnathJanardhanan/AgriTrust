import express from "express";
import { login, registerFarmer,me } from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register/farmer", registerFarmer);
router.get("/me", authenticate, me);

export default router;
