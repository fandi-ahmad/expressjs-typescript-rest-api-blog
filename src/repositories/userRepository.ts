import prisma from "@/lib/prisma";
import { UserDTO, UserUpdateDTO } from "@/interface/userDTO";

export const UserRepository = {
  createUser: async (data: UserDTO) => {
    return await prisma.user.create({ data });
  },

  getUserById: async (id: number) => {
    return await prisma.user.findUnique({ where: { id } })
  },

  getUserByEmail: async (email: string) => {
    return await prisma.user.findFirst({ where: { email } })
  },

  getUserByUsername: async (username: string) => {
    return await prisma.user.findFirst({ where: { username },
      select: { id: true, email: true, name: true, username: true }
    })
  },

  getAllUsers: async () => {
    return await prisma.user.findMany({
      select: { id: true, email: true, name: true, username: true }
    })
  },

  getUserByRefreshToken: async (refreshToken: string) => {
    return await prisma.user.findFirst({ where: { refreshToken } })
  },

  updateUser: async (id: number, data: UserUpdateDTO) => {
    return await prisma.user.update({
      where: { id },
      data: data
    })
  },

  deleteUser: async (id: number) => {
    return await prisma.user.delete({ where: { id } })
  },

  checkConflictEmailAndUsername: async (id: number, email: string, username: string) => {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { email, NOT: { id: id } },
          { username, NOT: { id: id } },
        ],
      },
    });
  }
}