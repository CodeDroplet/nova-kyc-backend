import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { kycRequests } from "./kycRequests";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"), // 'admin' or 'user'
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  kycRequests: many(kycRequests),
}));

// Types
export const UserType = users.$inferSelect;
export const UserInsertType = users.$inferInsert;
