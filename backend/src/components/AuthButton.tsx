"use client";

import { useRouter } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();

  async function handleSignOut() {
    const res = await fetch("/api/auth/signout", { method: "POST" });

    if (res.ok) {
      router.push("/login"); // Redirect to login page after logout
    } else {
      console.error("Logout failed");
    }
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
}
