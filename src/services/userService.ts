import { UserDTO, UserUpdateDTO } from "@/interface/userDTO"
import { UserRepository } from "@/repositories/userRepository"
import { BcryptPassword } from "@/utils/bcryptPassword"

export const UserService = {
  async createUser(data: UserDTO) {
    if (data.password.length < 8) {
      throw { status: 400, message: 'The password must not be less than 8 characters' }
    } else if (data.username.includes(' ')) {
      throw { status: 400, message: 'Username cannot contain spaces' }
    } else {
      const email = await UserRepository.getUserByEmail(data.email)
      if (email) {
        throw { status: 400, message: 'This email has already been used' }
      }
      
      const username = await UserRepository.getUserByUsername(data.username)
      if (username) {
        throw { status: 400, message: 'This username has already been used' }
      }
  
      if (!email && !username) {
        const hashedPassword = await BcryptPassword.hash(data.password)
        return await UserRepository.createUser({
          email: data.email,
          username: data.username,
          password: hashedPassword,
          name: data.name
        })
      }
    }
  },

  async getUserById(id: number) {
    const user = await UserRepository.getUserById(id)
       
    if (!user) {
      throw { status: 404, message: `User with ID ${id} is not found` }
    }
    return user
  },

  async getUserByUsername(username: string) {
    const user = await UserRepository.getUserByUsername(username)
    if (!user) {
      throw { status: 404, message: `User with username ${username} is not found` }
    }
    return user
  },

  async getAllUsers() {
    return UserRepository.getAllUsers()
  },

  async checkConflictEmailAndUsername(id: number, data: UserUpdateDTO) {
    const existingConflict: any = await UserRepository.checkConflictEmailAndUsername(id, data.email, data.username)
    
    if (existingConflict) {
      if (existingConflict.email === data.email) {
        throw { status: 400, message: 'Email has been used by another user' }
      }
      if (existingConflict.username === data.username) {
        throw { status: 400, message: 'Username has been used by another user' }
      }
    } else {
      return false
    }
  },

  async updateUser(id: number, data: UserUpdateDTO) {
    if (data.username.includes(' ')) {
      throw { status: 400, message: 'Username cannot contain spaces' }
    } else {
      await this.getUserById(id)
      await this.checkConflictEmailAndUsername(id, data)
      return await UserRepository.updateUser(id, data)
    }
  },

  async deleteUser(id: number) {
    await this.getUserById(id)
    return await UserRepository.deleteUser(id)
  }
}