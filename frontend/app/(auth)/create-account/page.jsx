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
  const [isJWT, setIsJWT] = useState(false);
  const [loader, setLoader] = useState()
  const router = useRouter();

  const onCreateAccount = () => {
    setLoader(true)
    GlobalApi.createUser(username, email, password).then(
      (res) => {
        console.log(res.data.user);
        console.log(res.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Account created succesfully");

        router.push("/");
        setLoader(false)

      },
      (e) => {
        console.log(e);
        toast(e?.response?.data?.error?.message);
        setLoader(false)

      }
    );
  };

  useEffect(() => {
    // Ensure sessionStorage is accessed on the client side
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
          className=" flex flex-col items-center justify-center
        p-10 bg-slate-200 border-gray-200"
        >
          {/* <h1 className='className=" text-base md:text-5xl font-bold text-purple-600 transition-colors">
           '>Saral Events</h1> */}
          <h2 className="font-bold text-3xl font-bold text-purple-600 transition-colors">
            Create Account
          </h2>
          <h2 className="text-gray-500 mt-2 ">
            Enter your details to create an account
          </h2>
          <div className="w-full flex flex-col gap-5 mt-7 ">
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={() => onCreateAccount()}
              disabled={!(username && email && password)}
            >
             {loader?  <LoaderIcon className="animate-spin"/>  : 'Creant an Account' }
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
