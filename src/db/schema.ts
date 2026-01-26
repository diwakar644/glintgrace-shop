import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// We are creating a table named 'products'
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }), // Auto-generates 1, 2, 3...
  name: text('name').notNull(),       // Must have a name
  price: integer('price').notNull(),  // Must have a price
  image: text('image').notNull(),     // Must have an image URL
  category: text('category').notNull(), 
  description: text('description'),   // Optional (no .notNull)
});