import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/db/schema/index';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function initDbConnection() {
  const { env } = getRequestContext(); // Always use Cloudflare bindings

  if (!env.DB) {
    throw new Error("Database binding (DB) is missing. Ensure it's set correctly.");
  }

  console.log("DB Connection:", env.DB); // Debugging log

  return drizzle(env.DB, { schema });
}

export const db = initDbConnection();
