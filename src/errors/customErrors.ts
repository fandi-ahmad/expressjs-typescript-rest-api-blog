import { ApiResponseDTO } from "../interface/apiResponseDTO";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
   

    // Untuk mendukung Error.captureStackTrace di Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

export const ErrorResponseReturn = (res: any, err: ApiResponseDTO) => {
  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      mssage: err.message
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
}