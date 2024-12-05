import { PostRepository } from "../repositories/postRepository";
import { createPostDTO } from "../interface/createPostDTO";

export const PostService = {
  async createPost(data: createPostDTO) {
    // if (!data.content || !data.authorEmail) {
    //   throw new Error("Content and author email are required! from service");
    // }
    

    return await PostRepository.createPost(data);
  },

  async getPostById(id: number) {
    const post = await PostRepository.findPostById(id);
    if (!post) {
      throw { status: 400, message: `Post with ID ${id} is not found` }
    }
    return post;
  },

  async getAllPosts() {
    return await PostRepository.getAllPosts();
  },

  async updatePost(id: number, content: string) {
    await this.getPostById(id)
    return PostRepository.updatePost(id, content);
  },

  async deletePost(id: number) {
    await this.getPostById(id)
    return await PostRepository.deletePost(id);
  },
};
