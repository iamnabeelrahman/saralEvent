"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isJWT, setIsJWT] = useState(false);
  const [loader, setLoader] = useState();
  const router = useRouter();

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.createUser(username, email, password).then(
      (res) => {
        console.log(res.data.user);
        console.log(res.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Account created successfully");

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        setIsJWT(true);
      }
    }
  }, []);

  if (!isJWT) {
    return (
      <div className="flex items-baseline justify-center my-20">
        <div
          className="flex flex-col items-center justify-center
        p-10 bg-slate-200 border-gray-200"
        >
          <h2 className="font-bold text-3xl font-bold text-purple-600 transition-colors">
            Create Account
          </h2>
          <h2 className="text-gray-500 mt-2">
            Enter your details to create an account
          </h2>
          <div className="w-full flex flex-col gap-5 mt-7">
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
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

            <Button
            className="cursor-pointer"
              onClick={() => onCreateAccount()}
              disabled={!(username && email && password)}
            >
              {loader ? <LoaderIcon className="animate-spin" /> : "Create an Account"}
            </Button>

            <p>
              Already have an Account?{" "}
              <Link className="text-blue-500" href={"/sign-in"}>
                Sign in
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
