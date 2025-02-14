import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { channels } from "./channels";
import { users } from "./users";
import { events } from "./events";


export const eventRoles = sqliteTable("event_roles", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), 
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  eventId: text("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  role: text("role", { enum: ["Owner", "Admin", "Member", "Guest"] }).notNull().default("Guest"),
  assignedAt: integer("assigned_at", { mode: "timestamp" }).defaultNow(),
  });