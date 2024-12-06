import { Router } from "express";
import { createUser, getUserByUsername, getAllUsers, deleteUser, updateUser } from "@/controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:username", getUserByUsername);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;