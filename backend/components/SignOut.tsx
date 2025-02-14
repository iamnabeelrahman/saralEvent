"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  async function handleSignOut() {
    const res = await fetch("/api/auth/signout", { method: "POST" });

    if (res.ok) {
      router.push("/sign-in"); // Redirect to login page after logout
    } else {
      console.error("Logout failed");
    }
  }

  return <span onClick={handleSignOut}>Sign Out</span>;
}
