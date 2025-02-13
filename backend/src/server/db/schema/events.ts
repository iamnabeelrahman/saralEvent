import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { channels } from "./channels";
import { categories } from "./categories";

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), 
  title: text("title").notNull(),
  description: text("description"),
  date: integer('date', { mode: "timestamp" }).notNull(),
  location: text('location').notNull(),
  price: integer("price").notNull().default(0),
  categoryId: text('category_id').references(() => categories.id),
  organiserId: text("organiser_id").references(() => users.id, { onDelete: "cascade" }),
  channelId: text("channel_id").references(() => channels.id, { onDelete: "cascade" }),  
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});