import express from "express";
import authRouter from "./auth";
import userRouter from "./users";
import kycRouter from "./kyc";
import reportsRouter from "./reports";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/kyc", kycRouter);
rootRouter.use("/reports", reportsRouter);

export default rootRouter;
