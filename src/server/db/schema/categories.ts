import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';


export const categories = sqliteTable('categories', {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // UUID v4
    name: text('name').notNull(),
    icon: text("icon"),
  });