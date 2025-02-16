import {  users } from '@/server/db/schema';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';

export const runtime = 'edge';

export async function GET() {

  const { env } = getRequestContext();
  const DB = drizzle(env.DB, {schema});

  const result = await DB.select().from(users);

  return Response.json({ result });
}