import express from "express";
import authRouter from "./auth";
import userRouter from "./users";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);

export default rootRouter;
