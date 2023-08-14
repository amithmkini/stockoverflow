import { InferModel } from 'drizzle-orm'
import { pgTable, varchar, uuid, uniqueIndex } from 'drizzle-orm/pg-core'

export const portfolioTable = pgTable('portfolio', {
  id: uuid('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
}, (portfolio) => {
  return {
    userSlugIndex: uniqueIndex('user_slug_index').on(portfolio.userId, portfolio.slug),
  }
})

export type Portfolio = InferModel<typeof portfolioTable, 'select'>
