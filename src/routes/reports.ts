import express, { Router } from "express";
import { UserRole } from "../types/users";
import ReportsController from "../controllers/ReportsController";
import verifyUser from "../middlewares/verifyUser";

const reportsRouter: Router = express.Router();

reportsRouter.get("/", verifyUser(UserRole.ADMIN), ReportsController.read);

export default reportsRouter;
