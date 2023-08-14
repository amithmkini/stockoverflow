import { InferModel } from 'drizzle-orm'
import {
  pgTable,
  date,
  pgEnum,
  timestamp,
  integer,
  numeric,
  uuid,
} from 'drizzle-orm/pg-core'

import { portfolioTable } from './portfolio'
import { symbolTable } from './stock'

export const holdingTable = pgTable('holding', {
  id: uuid('id').primaryKey(),
  portfolioId: uuid('portfolio_id')
    .notNull()
    .references(() => portfolioTable.id),
  symbolId: integer('symbol_id')
    .notNull()
    .references(() => symbolTable.id),
  avgPricePerShare: numeric('avg_price_per_share', {
    precision: 22,
    scale: 2,
  }).notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const transactionType = pgEnum('transaction_type', ['buy', 'sell'])

export const transactionTable = pgTable('transaction', {
  id: uuid('id').primaryKey(),
  holdingsId: uuid('holdings_id')
    .notNull()
    .references(() => holdingTable.id),
  txDate: date('tx_date', { mode: 'date' }).notNull(),
  txType: transactionType('tx_type').notNull(),
  quantity: integer('quantity').notNull(),
  value: numeric('value', { precision: 22, scale: 2 }).notNull(),
  brokerage: numeric('brokerage', { precision: 22, scale: 2 }).notNull(),
  stt: numeric('stt', { precision: 22, scale: 2 }).notNull(),
  otherCharges: numeric('other_charges', { precision: 22, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Holding = InferModel<typeof holdingTable, 'select'>
export type Transaction = InferModel<typeof transactionTable, 'select'>
