"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function page() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isJWT, setIsJWT] = useState(false);
  const [loader, setLoader] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        setIsJWT(true);
      }
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Login successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        console.log(e);
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  if (!isJWT) {
    return (
      <div className="flex items-baseline justify-center my-20">
        <div
          className="flex flex-col items-center justify-center
      p-10 bg-slate-200 border-gray-200"
        >
          <h2 className="font-bold text-3xl text-purple-600 transition-colors">
            Sign In
          </h2>
          <h2 className="text-gray-500 mt-2">Enter your details</h2>
          <div className="w-full flex flex-col gap-5 mt-7">
            <Input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <Button className="cursor-pointer" onClick={() => onSignIn()} disabled={!(email && password)}>
              {loader ? <LoaderIcon className="animate-spin" /> : "Sign-in"}
            </Button>

            <p>
              Don't have an account?{" "}
              <Link className="text-blue-500" href={"/create-account"}>
                Create Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    alert("You are already signed-in");
    return router.push("/");
  }
}

export default page;
