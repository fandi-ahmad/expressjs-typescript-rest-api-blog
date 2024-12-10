import { Router } from "express";
import { getAllPosts, createPost, getPostById, updatePost, deletePost, } from "@/controllers/postController";
import { verifyToken } from "@/middlewares/verifyToken";
const router = Router();

router.get("/", getAllPosts);
router.post("/", verifyToken, createPost);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;