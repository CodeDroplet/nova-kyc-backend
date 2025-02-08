import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dbConfig from "../config/db";
import * as schema from "./schemas";

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promisify for async/await usage
const promisePool = pool.promise();

const db = drizzle({
  client: promisePool,
  schema,
  mode: "default",
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Successfully connected to database");
  connection.release();
});

export default db;
