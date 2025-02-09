import { Request, Response } from "express";
import User from "../models/User";
import { formatResponse } from "../utils/formatResponse";
import ApiError from "../utils/apiError";
import JWTService from "../services/TokenService";
import { hashPassword, verifyPassword } from "../utils/hashPassword";
import _ from "lodash";

class AuthController {
  static async register(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOneByEmail(email);

      if (existingUser) {
        throw new ApiError("User already exists", 409);
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create(firstName, lastName, email, hashedPassword);

      const token = JWTService.signToken({ userId: user.id });

      return formatResponse(res, 201, "User created successfully", { token, user: _.omit(user, "password") });
    } catch (err: any) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: any): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await User.findOneByEmail(email);

      if (!user) {
        throw new ApiError("Invalid email or password combination", 401);
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        throw new ApiError("Invalid email or password combination", 401);
      }

      const token = JWTService.signToken({ userId: user.id });
      return formatResponse(res, 200, "Login successful", { token, user: _.omit(user, "password") });
    } catch (err: any) {
      next(err);
    }
  }
}

export default AuthController;
