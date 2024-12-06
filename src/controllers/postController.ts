import { Request, Response } from "express";
import { PostService } from "@/services/postService";
import { createPostDTO } from "@/interface/createPostDTO";
import { successResponse, validationErrorResponse, createdDataResponse } from "@/helper/responseHelper";
import { errorResponse } from "@/helper/errorResponse";

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(successResponse('ok', posts));
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content, authorEmail }: createPostDTO = req.body;

  if (!content || !authorEmail) {
    res.status(400).json(validationErrorResponse('Content and authorEmail are required!'));
    return
  }

  try {
    const post = await PostService.createPost({ content, authorEmail });
    res.status(201).json(createdDataResponse('Post created successfully', post));
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    res.status(400).json(validationErrorResponse('Content are required for updated!'));
    return
  }

  try {
    const updatedPost = await PostService.updatePost(Number(id), content);
    res.status(200).json(successResponse('Post updated successfully', updatedPost));
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(Number(id));
    res.status(200).json(successResponse('ok', post));
  } catch (error: any) {
    return errorResponse(res, error)
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await PostService.deletePost(Number(id))
    res.status(200).json(successResponse(`Post with ID ${id} deleted successfully`));
  } catch (error: any) {
    return errorResponse(res, error)
  }
}