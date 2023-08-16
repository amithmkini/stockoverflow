import { InferModel } from 'drizzle-orm'
import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  date,
} from 'drizzle-orm/pg-core'

export const symbolTable = pgTable('symbol', {
  id: serial('id').primaryKey(),
  symbol: varchar('symbol', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  exchange: varchar('exchange', { length: 255 }).notNull(),
  currentPrice: numeric('current_price', { precision: 22, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 100 }).notNull(),
})

export const timeseriesTable = pgTable('timeseries', {
  id: serial('id').primaryKey(),
  symbolId: integer('symbol_id')
    .notNull()
    .references(() => symbolTable.id),
  date: date('date', { mode: 'date' }).notNull(),
  open: numeric('open', { precision: 22, scale: 2 }).notNull(),
  high: numeric('high', { precision: 22, scale: 2 }).notNull(),
  low: numeric('low', { precision: 22, scale: 2 }).notNull(),
  close: numeric('close', { precision: 22, scale: 2 }).notNull(),
  volume: integer('volume').notNull(),
})

export const nseListTable = pgTable('nse_list', {
  id: serial('id').primaryKey(),
  date: date('date', { mode: 'date' }).notNull(),
  md5sum: varchar('md5sum', { length: 255 }).notNull(),
})

export type Symbol = InferModel<typeof symbolTable, 'select'>
export type Timeseries = InferModel<typeof timeseriesTable, 'select'>
export type NseList = InferModel<typeof nseListTable, 'select'>
