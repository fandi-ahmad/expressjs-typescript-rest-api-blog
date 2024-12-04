import { Router } from "express";
import postRoutes from "./postRoutes"
import userRoutes from "./userRoutes"

const router = Router()

router.use('/post', postRoutes)
router.use('/user', userRoutes)

export default router;