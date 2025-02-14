export const runtime = "edge"; // Ensure it runs on Edge

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

// Password verification function
async function verifyPassword(plainPassword: string, storedHash: string) {
    if (!storedHash || !plainPassword) return false; // Ensure inputs are valid
  
    const parts = storedHash.split(":");
    if (parts.length !== 2) return false; // Ensure correct format
  
    const [salt, hash] = parts;
    if (!salt || !hash) return false; // Ensure salt and hash exist
  
    try {
      const saltBytes = new Uint8Array(atob(salt).split("").map(c => c.charCodeAt(0)));
  
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(plainPassword),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
  
      const derivedKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: saltBytes, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "HMAC", hash: "SHA-256", length: 256 },
        true,
        ["sign"]
      );
  
      const hashBuffer = await crypto.subtle.exportKey("raw", derivedKey);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const computedHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
      return computedHash === hash;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }
  

import { AuthOptions } from "next-auth"; // Ensure correct typing

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.select().from(users).where(eq(users.email, credentials.email));
        if (!user || user.length === 0) return null;

        const foundUser = user[0]; // Ensure user exists
        if (!foundUser?.password) return null;

        const isValid = await verifyPassword(credentials.password, foundUser.password);
        if (!isValid) return null;

        return { id: foundUser.id, email: foundUser.email, name: foundUser.fullName };
      },
    }),
  ],
  session: {
    strategy: "jwt" as "jwt", // Explicitly typing the string
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, id: token.id, email: token.email };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
