import express, { type Router } from "express";
import upload from "../middlewares/upload";
import { createKycRequestSchema, updateKycRequestSchema } from "../schemas/kyc";
import validate from "../middlewares/validate";
import KYCController from "../controllers/KYCController";
import verifyUser from "../middlewares/verifyUser";
import { UserRole } from "../types/users";

const kycRouter: Router = express.Router();

kycRouter.get("/", verifyUser(), KYCController.read);

kycRouter.get("/:id", verifyUser(UserRole.ADMIN), KYCController.readOne);

kycRouter.post(
  "/request",
  verifyUser(),
  upload.fields([
    {
      name: "documentFront",
      maxCount: 1,
    },
    {
      name: "documentBack",
      maxCount: 1,
    },
  ]),
  validate(createKycRequestSchema),
  KYCController.create,
);

// Route for updating KYC status
kycRouter.patch("/:id", verifyUser(UserRole.ADMIN), validate(updateKycRequestSchema), KYCController.update);

export default kycRouter;
