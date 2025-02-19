import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { events } from "./events";
import { users } from "./users";


export const distributor_partner = sqliteTable("distributor_partner", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), 
    eventId: text("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
    distributorId: text("distributor_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    commissionPercentage: integer("commission_percentage").notNull().default(10), // Default 10%
    createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
  });
  