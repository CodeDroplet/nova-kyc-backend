import JWTService from "../services/TokenService";
import User from "../models/User"; // Assuming you have a User model
import { Response, NextFunction, Request } from "express";
import { UserRole } from "../types/users";
import AuthError from "../utils/authError";

const verifyUser = (role?: UserRole) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthError("Authorization header not provided", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AuthError("Token not provided", 401);
    }

    const decodedToken = JWTService.verifyToken(token);
    req.userId = decodedToken.userId;

    const user = await User.findOne(decodedToken.userId);

    if (!user) {
      throw new AuthError("User not found", 401);
    }

    if (role && user.role !== role) throw new AuthError("Insufficient permissions", 401);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      return next(error);
    }
    next(new AuthError("Unauthorized", 401));
  }
};

export default verifyUser;
