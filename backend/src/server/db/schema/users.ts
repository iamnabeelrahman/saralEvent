import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // UUID v4
  email: text("email").unique().notNull(),
  username: text("username"), // Only for general users
  fullName: text("full_name"), // Common field for both
  bio: text("bio"), // For general users
  profileImage: text("profile_image"),
  location: text("location"),
  role: text("role", { enum: ["general", "organiser"] }).notNull().default("general"), 
  password: text("password").notNull(), 
  organiserName: text("organiser_name"), // Only for organisers
  organiserDescription: text("organiser_description"), // Only for organisers
  provider: text("provider"), // OAuth providers 
  confirmed: integer("confirmed", { mode: "boolean" }).default(false),
  blocked: integer("blocked", { mode: "boolean" }).default(false), 
  resetPasswordToken: text("reset_password_token"),
  confirmationToken: text("confirmation_token"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  refreshToken: text("refresh_token"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});