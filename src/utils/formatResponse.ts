import { Response } from "express";

export const formatResponse = (res: Response, code: number, message: string, data: any) => {
  return res.status(code).json({
    status: code < 400 ? "success" : "error",
    message,
    data,
  });
};
