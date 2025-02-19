import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), 
  email: text("email").unique().notNull(),
  username: text("username"),
  fullName: text("full_name"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  location: text("location"),
  role: text("role", { enum: ["general", "organiser"] }).notNull().default("general"), 
  password: text("password").notNull(), 
  organiserName: text("organiser_name"), // Only for organisers
  organiserDescription: text("organiser_description"), // Only for organisers
  provider: text("provider"), 
  confirmed: integer("confirmed", { mode: "boolean" }).default(false),
  blocked: integer("blocked", { mode: "boolean" }).default(false), 
  resetPasswordToken: text("reset_password_token"),
  confirmationToken: text("confirmation_token"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  refreshToken: text("refresh_token"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});



// const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now (in seconds)

// await db.insert(users).values({
//   email: "user@example.com",
//   password: "hashedpassword",
//   resetPasswordToken: "randomtoken123",
//   resetPasswordTokenExpiry: expirationTime, // ✅ Store as UNIX timestamp
// });


// const user = await db
//   .select()
//   .from(users)
//   .where(
//     and(
//       eq(users.resetPasswordToken, "randomtoken123"),
//       gt(users.resetPasswordTokenExpiry, Math.floor(Date.now() / 1000)) // ✅ Check expiry
//     )
//   )
//   .get();
