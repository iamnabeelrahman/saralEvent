import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { events } from "./events";

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // UUID v4
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    eventId: integer("event_id").references(() => events.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    totalPrice: integer("quantity").notNull().default(1),
    purchasedAt: integer("purchased_at", { mode: "timestamp" }).defaultNow(),
  });
  