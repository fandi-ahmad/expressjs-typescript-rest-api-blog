// Data Transfer Object (DTO)
export interface ApiResponseDTO<T = any> {
  status: number
  message: string
  data?: T
}