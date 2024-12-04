import prisma from "../lib/prisma";
import { createPostDTO } from "../interface/createPostDTO";

export const PostRepository = {
  async createPost({content, authorEmail}: createPostDTO) {
    return await prisma.post.create({
      data: {
        content,
        author: { connect: { email: authorEmail } },
      },
    });
  },

  async findPostById(id: number) {
    return await prisma.post.findUnique({ where: { id } });
  },

  async getAllPosts() {
    return await prisma.post.findMany({ include: { author: true } });
  },

  async updatePost(id: number, data: any) {
    return await prisma.post.update({ where: { id }, data });
  },

  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  },
};