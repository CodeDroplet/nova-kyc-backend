import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
