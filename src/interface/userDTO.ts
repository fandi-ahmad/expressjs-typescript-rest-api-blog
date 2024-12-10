export interface UserDTO {
  email: string
  username: string
  name?: string
  password: string
  refreshToken?: string
}

export interface UserUpdateDTO {
  email: string
  username: string
  name: string
}