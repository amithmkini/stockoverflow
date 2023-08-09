import { config } from 'dotenv'
import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from '@/db/schema/schema'

config({ path: '.env.local' })

neonConfig.fetchConnectionCache = true
const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
export const db = drizzle(sql, { schema })
