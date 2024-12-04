interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => {
  return {
    status: 200,
    message,
    data
  };
};

export const errorResponse = (status: number, message: string, data?: any): ApiResponse => {
  return {
    status,
    message,
    data
  };
};

export const validationErrorResponse = (message: string): ApiResponse => {
  return {
    status: 400,
    message
  };
};
