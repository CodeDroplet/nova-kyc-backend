import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dbConfig from "../config/db";
import * as schema from "./schemas";

const connection = mysql.createConnection({
  uri: dbConfig.db_url,
});

const db = drizzle({
  client: connection,
  schema,
  mode: "default",
});

export default db;
