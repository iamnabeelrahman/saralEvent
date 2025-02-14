"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { checkUserSignedStatus } from "utils/auth";
import { GetServerSideProps } from 'next';

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  profileImage?: string | null;
  role: string;
  token: string;
  accessToken:string
}

interface SignInResponse {
  success: boolean;
  message: string;
  user: User;
}

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  // Check if user is already logged in
  // useEffect(() => {
  //   async function checkAuth() {
  //     const isLoggedIn = await checkUserSignedStatus();
  //     if (isLoggedIn) {
  //       alert("You are already signed in!");
  //       router.push('/');
  //     }
  //   }
  //   checkAuth();
  // }, []);
  

  const onSignIn = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data: SignInResponse = await response.json();
  
      if (response.ok && data.success) {
        // Store the user data and token in localStorage (or sessionStorage)
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.user.accessToken); // Store the token here
        toast.success(data.message);
        router.push("/"); // Redirect to the homepage after successful login
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login");
    } finally {
      setLoader(false);
    }
  };  
  
  return (
    <div className="flex items-center justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-200 border-gray-200 rounded-lg">
        <h2 className="font-bold text-3xl text-purple-600">Sign In</h2>
        <h2 className="text-gray-500 mt-2">Enter your details</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <Button className="cursor-pointer" onClick={onSignIn} disabled={!(email && password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign-in"}
          </Button>

          <p>
            Don't have an account?{" "}
            <Link className="text-blue-500" href="/create-account">
              Create Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default SignInPage;
