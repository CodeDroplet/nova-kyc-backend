import express from "express";
import authRouter from "./auth";
import userRouter from "./users";
import kycRouter from "./kyc";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/kyc", kycRouter);

export default rootRouter;
