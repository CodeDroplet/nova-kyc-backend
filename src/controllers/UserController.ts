import { Request, Response } from "express";
import User from "../models/User";
import { formatResponse } from "../utils/formatResponse";
import ApiError from "../utils/apiError";

class UserController {
  static async getAllUsers(req: Request, res: Response, next: any): Promise<any> {
    try {
      const users = await User.findAll();
      return formatResponse(res, 200, "Users found", users);
    } catch (err: any) {
      next(err);
    }
  }

  static async getUser(req: Request, res: Response, next: any): Promise<any> {
    try {
      const user = await User.findOne(+req.params.id);

      if (!user) throw new ApiError("User not found", 404);

      return formatResponse(res, 200, "User found", user);
    } catch (err: any) {
      next(err);
    }
  }
}

export default UserController;
