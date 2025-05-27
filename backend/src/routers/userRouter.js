import express from "express";
import { userProfile, updateUserProfile } from "../controllers/userController.js";
import { userProtect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", userProtect, userProfile);

router.put("/profile", userProtect, updateUserProfile);

export default router;