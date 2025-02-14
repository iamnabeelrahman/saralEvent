import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

/*
 * NOTE: Workaround to make drizzle studio work with D1.
 * https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/
 * Github discussion: https://github.com/drizzle-team/drizzle-orm/discussions/1545#discussioncomment-8115423
 */
export default env.DB_LOCAL_PATH
  ? defineConfig({
      schema: './src/server/db/schema',
      dialect: 'sqlite',
      dbCredentials: {
        url: env.DB_LOCAL_PATH,
      },
    })
  : defineConfig({
      schema: './src/server/db/schema',
      out: './migrations',
      driver: 'd1-http',
      dialect: 'sqlite',
      dbCredentials: {
        accountId: env.CLOUDFLARE_ACCOUNT_ID!,
        token: env.CLOUDFLARE_API_TOKEN!,
        databaseId: env.DB_REMOTE_DATABASE_ID!,
      },
    });
