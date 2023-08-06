import { InferModel, sql } from "drizzle-orm"
import { pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const portfolioTable = pgTable('portfolio', {
  id: serial('id').primaryKey(),
  name: varchar('name',{length: 255}).notNull(),
  description: varchar('description', {length: 255})
});

export type Portfolio = InferModel<typeof portfolioTable,'select'>
export type CreatePortfolio = InferModel<typeof portfolioTable,'insert'>