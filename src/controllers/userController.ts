import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json(result);
};

// Get user by username
export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username: String(username) },
  });
  res.json(user);
};
