// Import necessary modules
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/db/schema/index';
import { getRequestContext } from '@cloudflare/next-on-pages';

// Ensure the runtime is set for edge functions (important for Cloudflare workers)
export const runtime = 'edge';

// Function to initialize DB connection
async function initDbConnection() {
  try {
    const { env } = getRequestContext(); // Always use Cloudflare bindings

    if (!env.DB) {
      throw new Error("Database binding (DB) is missing. Ensure it's set correctly.");
    }

    console.log("DB Connection:", env.DB); // Debugging log
    return drizzle(env.DB, { schema }); // Return the database connection
  } catch (error) {
    console.error("Error initializing DB connection:", error);
    throw error; // Re-throw error to handle it properly in your app
  }
}

// Initialize db connection
export const db = await initDbConnection(); // This will now be handled safely
