import { SafeUserType } from "./../models/User";

declare global {
  namespace Express {
    interface Request {
      userId: number;
      user?: typeof SafeUserType;
    }
  }
}
