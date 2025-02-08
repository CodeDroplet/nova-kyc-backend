import { UserType } from "../db/schemas/user";

declare global {
  namespace Express {
    interface Request {
      userId: number;
      user?: typeof UserType;
    }
  }
}
