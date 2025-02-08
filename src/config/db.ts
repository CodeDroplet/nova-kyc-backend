import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "kyc-db",
};

export default dbConfig;
