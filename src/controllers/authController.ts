import { Request, Response } from "express";
import { successResponse, validationErrorResponse } from "@/helper/responseHelper";
import { errorResponse } from "@/helper/errorResponse";
import { AuthService } from "@/services/authService";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json(validationErrorResponse('email and password required'))
    return
  }

  try {
    const { accessToken, refreshToken } = await AuthService.loginUser(email, password)
    const data = { accessToken, refreshToken }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).json(successResponse('Login succesfully', data))
  } catch (error: any) {
    errorResponse(res, error)
  }
}