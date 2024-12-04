import { PostRepository } from "../repositories/postRepository";
import { createPostDTO } from "../interface/createPostDTO";

export const PostService = {
  async createPost(data: createPostDTO) {
    if (!data.content || !data.authorEmail) {
      throw new Error("Content and author email are required! from service");
    }

    return await PostRepository.createPost(data);
  },

  async getPostById(id: number) {
    const post = await PostRepository.findPostById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  async getAllPosts() {
    return await PostRepository.getAllPosts();
  },

  async updatePost(id: number, data: any) {
    return await PostRepository.updatePost(id, data);
  },

  async deletePost(id: number) {
    return await PostRepository.deletePost(id);
  },
};
