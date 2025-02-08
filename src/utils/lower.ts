import { sql } from "drizzle-orm";
import { AnyMySqlColumn } from "drizzle-orm/mysql-core";

export const lower = (str: AnyMySqlColumn) => {
  return sql`LOWER(${str})`;
};
