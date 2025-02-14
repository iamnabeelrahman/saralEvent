import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";


export const channels = sqliteTable("channels", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), 
  name: text("name").notNull(),
  description: text("description"),
  organiserId: text("organiser_id").references(() => users.id, { onDelete: "cascade" }),  
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});