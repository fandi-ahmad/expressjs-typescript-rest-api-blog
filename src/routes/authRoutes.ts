import { Router } from "express";
import { loginUser, logoutUser } from "@/controllers/authController";

const router = Router();

router.post("/login", loginUser);
router.delete('/logout/:id', logoutUser)

export default router;