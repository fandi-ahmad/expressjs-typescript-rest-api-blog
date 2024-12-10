import prisma from "@/lib/prisma";

export const AuthRepository = {
  addOrUpdateRefreshToken: async (id: number, token: string) => {
    return await prisma.user.update({
      where: { id },
      data: { refreshToken: token }
    })
  },
  
  deleteRefreshToken: async (id: number) => {
    return await prisma.user.update({
      where: { id },
      data: { refreshToken: '' }
    })
  }
}