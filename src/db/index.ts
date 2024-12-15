import 'dotenv/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { schema } from './schema'

// Sticking with naive singleton to save time. It's not a true singleton, most likely,
// because of how next bundles things, but we can't let it get out of control during dev
export const getClient = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  if (!globalThis.__db) {
    // Prefer using a connection pool.
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    // Pass the schema here.
    globalThis.__db = drizzle(pool, { schema })
  }

  return globalThis.__db
}

declare global {
  var __db: NodePgDatabase<typeof schema> & {
    $client: Pool
  }
}
