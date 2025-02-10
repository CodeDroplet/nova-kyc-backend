import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import rateLimit from "express-rate-limit";
import setupUploads from "./utils/setupUploads";
import helmet from "helmet";
dotenv.config();

const app = express();

// Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup uploads
setupUploads();
app.use("/uploads", express.static("uploads"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);
app.use(rootRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
