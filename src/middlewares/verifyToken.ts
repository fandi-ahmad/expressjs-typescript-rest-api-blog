import { UserRepository } from "@/repositories/userRepository";
import { Request, Response, NextFunction } from "express"

export const verifyToken =  (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    try {
      const { refreshtoken } = req.headers
  
      if (refreshtoken && typeof refreshtoken === 'string') {
        const user = await UserRepository.getUserByRefreshToken(refreshtoken)
        if (!user) {
          return res.status(401).json({ status: 401, message: "Unauthorized" });
        }
        return next()
      } else {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
      }
    } catch (error) {
      console.log(error, '<-- error from middleware');
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  })()
}