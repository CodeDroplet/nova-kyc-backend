import JWTService from "../services/TokenService";
import ApiError from "../utils/apiError";
import User from "../models/User"; // Assuming you have a User model
import { Response, NextFunction, Request } from "express";
import { UserRole } from "../types/users";

const verifyUser = (role?: UserRole) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError("Authorization header not provided", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError("Token not provided", 401);
    }

    const decodedToken = JWTService.verifyToken(token);
    req.userId = decodedToken.userId;

    const user = await User.findOne(decodedToken.userId);

    if (!user) {
      throw new ApiError("User not found", 401);
    }

    if (role && user.role !== role) throw new ApiError("Insufficient permissions", 401);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError("Unauthorized", 401));
  }
};

export default verifyUser;
