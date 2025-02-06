import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dbConfig from "../config/db";

const connection = mysql.createConnection({
	host: dbConfig.host,
	port: dbConfig.port,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

const db = drizzle({
	client: connection,
});

export default db;
