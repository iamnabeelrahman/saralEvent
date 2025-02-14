// import { Lucia } from "lucia";
// import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
// import { db } from "@/server/db";
// import { sessions, users } from "@/server/db/schema";

// export const lucia = new Lucia(
//   new DrizzleSQLiteAdapter(db, sessions, users),
//   {
//     env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
//     getUserAttributes: (user: DatabaseUserAttributes) => ({
//       username: user.username,
//     }),
//   }
// );

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseUserAttributes: {
//       username: string;
//     };
//   }
// }
