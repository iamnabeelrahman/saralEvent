'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowBigLeft, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define the structure of the API response
interface SignUpResponse {
  user: { username: string; email: string }; // Update as per your actual response shape
  jwt: string;
  message?: string;
}

const Page = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [isToken, setIsToken] = useState<boolean>(false);
  const router = useRouter();

  const onCreateAccount = async () => {
    setLoader(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, fullName, bio }),
      });

      const data: SignUpResponse = await response.json();

      if (response.ok) {
        // sessionStorage.setItem('user', JSON.stringify(data.user));
        // sessionStorage.setItem('jwt', data.jwt);
        toast('Account created successfully');
        router.push('/');
      } else {
        toast(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast('Error creating account');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jwt = sessionStorage.getItem('jwt');
      if (jwt) {
        setIsToken(true);
      }
    }
  }, []);

  if (isToken) {
    alert('You are already signed-in');
    router.push('/');
    return null;
  }

  // Define type for event parameter
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  return (
    <div className="my-20 flex items-baseline justify-center">
      <div className="flex flex-col items-center justify-center border-gray-200 bg-slate-200 p-10">
     <h2 className="text-3xl font-bold text-purple-600">Create Account</h2>
        <h2 className="mt-2 text-gray-500">Enter your details to create an account</h2>
        <div className="mt-7 flex w-full flex-col gap-5">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setUsername)}
          />
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setEmail)}
          />
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setFullName)}
          />
           <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setPassword)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <Input
            placeholder="Bio"
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setBio)}
          />
         

          <Button
            className="cursor-pointer"
            onClick={onCreateAccount}
            disabled={!(username && email && password && fullName)}
          >
            {loader ? <LoaderIcon className="animate-spin" /> : 'Create an Account'}
          </Button>

          <p>
            Already have an Account?{' '}
            <Link className="text-blue-500" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
