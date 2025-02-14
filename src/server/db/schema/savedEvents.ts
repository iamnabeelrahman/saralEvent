import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { events } from "./events";


export const savedEvents = sqliteTable("saved_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // UUID v4
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    eventId: integer("event_id").references(() => events.id, { onDelete: "cascade" }),
    savedAt: integer("saved_at", { mode: "timestamp" }).defaultNow(),
  });
  