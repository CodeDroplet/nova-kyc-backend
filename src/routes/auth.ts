import { loginSchema } from "./../schemas/auth";
import express, { type Router } from "express";
import AuthController from "../controllers/AuthController";
import validate from "../middlewares/validate";
import { registerSchema } from "../schemas/auth";

const authRouter: Router = express.Router();

authRouter.post("/register", validate(registerSchema, "body"), AuthController.register);
authRouter.post("/login", validate(loginSchema, "body"), AuthController.login);

export default authRouter;
