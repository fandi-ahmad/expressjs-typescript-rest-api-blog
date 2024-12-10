import { Request, Response } from "express";
import { createdDataResponse, successResponse, validationErrorResponse } from "@/helper/responseHelper";
import { errorResponse } from "@/helper/errorResponse";
import { UserService } from "@/services/userService";

export const createUser = async (req: Request, res: Response) => {
  const { email, username, name, password } = req.body
  
  if (!email || !username || !password) {
    res.status(400).json(validationErrorResponse('email, username, and password are required!'));
    return
  }
  
  try {
    await UserService.createUser({ email, username, name, password })
    res.status(201).json(createdDataResponse('user created successfully'));
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await UserService.getUserByUsername(username)
    res.status(200).json(createdDataResponse('ok', user))
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers()
    res.status(200).json(successResponse('ok', users));
  } catch (error: any) {
    return errorResponse(res, error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { email, username, name } = req.body

  if (!email || !username || !name ) {
    res.status(400).json(validationErrorResponse('email, username, and name are required!'));
    return
  }

  try {
    await UserService.updateUser(Number(id), { email, username, name })
    res.status(200).json(successResponse('User updated successfully'))
  } catch (error: any) {
    return errorResponse(res, error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await UserService.deleteUser(Number(id))
    res.status(200).json(successResponse(`User with ID ${id} deleted successfully`));
  } catch (error: any) {
    return errorResponse(res, error)
  }
}