import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

config({ path: '.env.local' })

const connectionString = process.env.DRIZZLE_DATABASE_URL!
const sql = postgres(connectionString, { max: 1 })
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
