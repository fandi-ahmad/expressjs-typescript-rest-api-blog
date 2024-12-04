import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { createPostDTO } from "../interface/createPostDTO";
import { successResponse, errorResponse, validationErrorResponse } from "../helper/responseHelper";

export const getAllPosts = async (_req: Request, res: Response) => {
  const posts = await PostService.getAllPosts();
  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, authorEmail }: createPostDTO = req.body;

    // Validasi input di controller
    if (!content || !authorEmail) {
      res.status(400).json(validationErrorResponse('Content and authorEmail are required!'));
      return
    }

    // Panggil service untuk membuat post
    const post = await PostService.createPost({ content, authorEmail });
    res.status(201).json(successResponse('Post created successfully', post));
  } catch (error) {
    // Tangani error yang terjadi pada server
    console.error(error);
    res.status(500).json(errorResponse(500, 'Internal Server Error'));
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, authorEmail }: createPostDTO = req.body;

  if (!content || !authorEmail) {
    res.status(400).json(validationErrorResponse('Content and authorEmail are required!'));
    return
  }

  try {
    const updatedPost = await PostService.updatePost(Number(id), { content, authorEmail });
    res.status(200).json(successResponse('Post updated successfully', updatedPost));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, 'Internal Server Error'));
  }
};

// export const createPost = async (req: Request, res: Response) => {
//   const { content, authorEmail }: createPostDTO = req.body;

//   if (!content || !authorEmail) {
//     res.status(400).json({
//       status: 400,
//       message: "content and authorEmail are required!",
//     });
//     return
//   }

//   try {
//     const post = await PostService.createPost({content, authorEmail});
//     res.status(201).json({ message: "Post created", data: post });
//   } catch (error) {
//     res.status(400).json({ message: "Internal server error create post" });
//   }
// };

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(Number(id));
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

// export const updatePost = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const { content } = req.body
//     const updatedPost = await PostService.getPostById(Number(id))
//     res.status(200).json(updatedPost)
//   } catch (error) {
//     res.status(400).json({ message: "Internal server error" });
//   }
// }

export const deletePost = async (req: Request, res: Response) => {

}