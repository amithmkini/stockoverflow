import { InferModel, sql } from "drizzle-orm"
import { pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email',{length: 255}).notNull().unique(),
  password: varchar('password', {length: 255}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  updatedAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`)
}, (table) => {
  return  {
    emailIdx: uniqueIndex("email_idx").on(table.email),
  }
})

export type User = InferModel<typeof userTable,'select'>
export type CreateUser = InferModel<typeof userTable,'insert'>
