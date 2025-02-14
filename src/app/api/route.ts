import { db } from '@/server/db';
import { customerTable, users } from '@/server/db/schema';

export const runtime = 'edge';

export async function GET() {
  const result = await db.select().from(users);

  return Response.json({ result });
}
