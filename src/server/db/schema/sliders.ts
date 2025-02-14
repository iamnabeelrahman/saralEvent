import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const sliders = sqliteTable('sliders', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    imageUrl: text('image_url').notNull(),
  });
  