import express, { type Router } from "express";
import verifyUser from "../middlewares/verifyUser";
import UserController from "../controllers/UserController";
import { UserRole } from "../types/users";

const userRouter: Router = express.Router();

userRouter.get("/", verifyUser(UserRole.ADMIN), UserController.getAllUsers);
userRouter.get("/:id", verifyUser(UserRole.ADMIN), UserController.getUser);

export default userRouter;
