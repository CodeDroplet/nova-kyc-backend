import { sql } from "drizzle-orm";
import { mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"), // 'admin' or 'user'
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Types
export const UserType = users.$inferSelect;
export const UserInsertType = users.$inferInsert;
