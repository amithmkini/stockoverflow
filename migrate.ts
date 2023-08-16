import { config } from 'dotenv'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'

config({ path: '.env.local' })

const db = drizzle(sql)

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: './db/drizzle' })
    console.log('Migrations ran successfully')
  } catch (e) {
    console.error('Migration failed', e)
  }
  process.exit(0)
}

main()
