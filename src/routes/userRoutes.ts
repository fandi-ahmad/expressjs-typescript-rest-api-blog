import { Router } from "express";
import { createUser, getUserByUsername, getAllUsers, deleteUser, updateUser } from "@/controllers/userController";
import { verifyToken } from "@/middlewares/verifyToken";
const router = Router();

router.get("/", verifyToken, getAllUsers);
router.post("/", createUser);
router.get("/:username", verifyToken, getUserByUsername);
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router;