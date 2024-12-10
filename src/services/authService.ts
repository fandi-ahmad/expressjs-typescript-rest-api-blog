import { AuthRepository } from "@/repositories/authRepository"
import { UserRepository } from "@/repositories/userRepository"
import { sign } from "jsonwebtoken"
import { BcryptPassword } from "@/utils/bcryptPassword"

export const AuthService = {
  async addOrUpdateRefreshToken(id: number, token: string) {
    return await AuthRepository.addOrUpdateRefreshToken(id, token)
  },

  async deleteRefreshToken(id: number) {
    return await AuthRepository.deleteRefreshToken(id)
  },

  async loginUser(email: string, password: string): Promise<{accessToken: string, refreshToken: string}> {
    const user = await UserRepository.getUserByEmail(email)
    if (!user) {
      throw { status: 404, message: 'User is not found' }
    }

    const isMatch = await BcryptPassword.verify(password, user.password)
    if (!isMatch) {
      throw { status: 400, message: 'Password is wrong' }
    }

    const accessToken = sign({email: user.email}, 'rest-access-token', {
      expiresIn: '60s'
    })

    const refreshToken = sign({email: user.email}, 'rest-refresh-token', {
      expiresIn: '1d'
    })

    await AuthRepository.addOrUpdateRefreshToken(user.id, refreshToken)
    
    return { accessToken, refreshToken }
  }
}