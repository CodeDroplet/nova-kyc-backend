import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./user";

export enum KycStatusType {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export const kycRequests = mysqlTable("kyc_requests", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  documentFront: text("document_front").notNull(),
  documentBack: text("document_back").notNull(),
  status: varchar("status", { length: 50 }).notNull().default(KycStatusType.PENDING),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const kycRequestsRelations = relations(kycRequests, ({ one }) => ({
  user: one(users, {
    fields: [kycRequests.userId],
    references: [users.id],
  }),
}));

// Types
export const KycRequestType = kycRequests.$inferSelect;
export const KycRequestInsertType = kycRequests.$inferInsert;
