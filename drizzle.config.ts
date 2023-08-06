import type { Config } from "drizzle-kit"
 
export default {
  schema: "./db/schema/*",
  out: "./db/drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  }
} satisfies Config;