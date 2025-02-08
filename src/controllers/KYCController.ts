import { Request, Response } from "express";
import KYCRequest from "../models/KYCRequest";
import { formatResponse } from "../utils/formatResponse";
import ApiError from "../utils/apiError";

class KYCController {
  static async read(req: Request, res: Response, next: any): Promise<any> {
    try {
      const userId = req.user.id;
      const kycRequest = await KYCRequest.findByUserId(+userId);

      if (!kycRequest) {
        throw new ApiError("No Kyc request found", 404);
      }

      return formatResponse(res, 200, "KYC request retrieved successfully", { kycRequest });
    } catch (err: any) {
      next(err);
    }
  }

  static async readOne(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const kycRequest = await KYCRequest.findOne(+id);
      if (!kycRequest) {
        throw new ApiError("KYC request not found", 404);
      }
      return formatResponse(res, 200, "KYC request retrieved successfully", { kycRequest });
    } catch (err: any) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { name, email } = req.body;
      const { documentFront, documentBack } = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Check if user already created the request
      const userRequest = await KYCRequest.findByUserId(req.user.id);
      if (userRequest.length > 0) {
        throw new ApiError("You already created a KYC request", 400);
      }

      const kycRequest = await KYCRequest.create(req.user.id, name, email, documentFront[0].path, documentBack[0].path);

      return formatResponse(res, 201, "KYC request created successfully", { kycRequest });
    } catch (err: any) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const kycRequest = await KYCRequest.findOne(+id);

      if (!kycRequest) {
        throw new ApiError("KYC request not found", 404);
      }

      const updatedKYC = await KYCRequest.updateStatus(+id, status);
      return formatResponse(res, 200, "KYC request updated successfully", { kycRequest: updatedKYC });
    } catch (err: any) {
      next(err);
    }
  }
}

export default KYCController;
