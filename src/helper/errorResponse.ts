import { ApiResponseDTO } from "@/interface/apiResponseDTO";

export const errorResponse = (res: any, err: ApiResponseDTO) => {
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
