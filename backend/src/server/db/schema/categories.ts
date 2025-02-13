import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';


export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
  });