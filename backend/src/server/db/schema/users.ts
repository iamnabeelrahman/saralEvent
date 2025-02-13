import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // UUID v4
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: text("role", { enum: ["general", "organiser"] }).notNull().default("general"), 
  username: text("username"), // Only for general users
  provider: text("provider"), // OAuth providers 
  resetPasswordToken: text("reset_password_token"),
  confirmationToken: text("confirmation_token"),
  confirmed: integer("confirmed", { mode: "boolean" }).default(false),
  blocked: integer("blocked", { mode: "boolean" }).default(false), 
  location: text("location"),
  bio: text("bio"), // For general users
  fullName: text("full_name"), // Common field for both
  profileImage: text("profile_image"),
  organiserName: text("organiser_name"), // Only for organisers
  organiserDescription: text("organiser_description"), // Only for organisers
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  refreshToken: text("refresh_token"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});