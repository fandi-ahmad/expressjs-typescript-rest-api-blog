import { Request, Response } from "express";
import prisma from "../lib/prisma"

// Fetch all posts
export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
};

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content, authorEmail } = req.body;
  console.log({content, authorEmail});

  if (!content || !authorEmail) {
    res.status(400).json({
      status: 400,
      message: 'content and authorEmail is required!'
    });
    return
  }
  
  try {
    const result = await prisma.post.create({
      data: {
        content,
        author: { connect: { email: authorEmail } },
      },
    });
    
    const data = {
      status: 201,
      message: 'create',
      data: result
    }
  
    res.status(201).json(data)
  } catch (error) {
    console.error(error, '<-- error createPost');
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });
  res.json(post);
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(post);
};
