import { InferModel } from 'drizzle-orm'
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core'

export const portfolioTable = pgTable('portfolio', {
  id: uuid('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
})
// TODO: Add a unique index on userId and slug

export type Portfolio = InferModel<typeof portfolioTable, 'select'>
