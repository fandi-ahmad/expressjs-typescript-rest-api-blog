import { ApiResponseDTO } from "@/interface/apiResponseDTO";

export const successResponse = <T>(message: string, data?: T): ApiResponseDTO<T> => {
  return {
    status: 200,
    message,
    data
  };
};

export const createdDataResponse = <T>(message: string, data?: T): ApiResponseDTO<T> => {
  return {
    status: 201,
    message,
    data
  };
};

export const validationErrorResponse = (message: string): ApiResponseDTO => {
  return {
    status: 400,
    message
  };
};
