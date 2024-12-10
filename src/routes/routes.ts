import { Router } from "express";
import postRoutes from "./postRoutes"
import userRoutes from "./userRoutes"
import authRoutes from "./authRoutes"

const router = Router()

router.use('/post', postRoutes)
router.use('/user', userRoutes)
router.use('/auth', authRoutes)

export default router;