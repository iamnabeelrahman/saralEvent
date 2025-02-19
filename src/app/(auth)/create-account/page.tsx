'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const runtime = 'edge';

// Define the structure of the API response
interface SignUpResponse {
  success: boolean;
  message?: string;
}
interface SignUpPayload {
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string;
  role: 'organiser' | 'general';
  organiserName?: string;
  organiserDescription?: string;
}
const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [isOrganiser, setIsOrganiser] = useState(false);
  const [organiserName, setOrganiserName] = useState('');
  const [organiserDescription, setOrganiserDescription] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
      alert('You are already signed-in');
      router.push('/');
    }
  }, []);

  const onCreateAccount = async () => {
    setLoader(true);
    try {
      const payload: SignUpPayload = {
        email,
        username,
        password,
        fullName,
        bio,
        role: isOrganiser ? 'organiser' : 'general',
      };

      if (isOrganiser) {
        if (!organiserName || !organiserDescription) {
          toast('Organiser name and description are required');
          setLoader(false);
          return;
        }
        payload.organiserName = organiserName;
        payload.organiserDescription = organiserDescription;
      }

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: SignUpResponse = await response.json();

      if (response.ok) {
        toast(data.message ?? 'Account created successfully');
        router.push('/');
      } else {
        toast(data.message ?? 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast('Error creating account');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-slate-200 p-10 border-gray-200 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-purple-600">Create Account</h2>
        <h2 className="mt-2 text-gray-500">Enter your details to create an account</h2>
        <div className="mt-7 flex w-full flex-col gap-5">
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          
          {/* Toggle for Organiser Registration */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="organiserToggle"
              checked={isOrganiser}
              onChange={() => setIsOrganiser(!isOrganiser)}
              className="w-5 h-5 cursor-pointer accent-purple-600"
            />
            <label htmlFor="organiserToggle" className="text-gray-700 cursor-pointer">
              Register as Organiser?
            </label>
          </div>

          {/* Show organiser-specific fields if the toggle is checked */}
          {isOrganiser && (
            <div className="w-full space-y-3 border border-gray-300 p-4 rounded-md bg-white">
              <h3 className="text-lg font-semibold text-gray-700">Organiser Details</h3>
              <Input placeholder="Organiser Name" value={organiserName} onChange={(e) => setOrganiserName(e.target.value)} />
              <Input placeholder="Organiser Description" value={organiserDescription} onChange={(e) => setOrganiserDescription(e.target.value)} />
            </div>
          )}

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
