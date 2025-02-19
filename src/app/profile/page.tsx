'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// const defaultImage = "https://via.placeholder.com/150";
export const runtime = 'edge';


interface User {
  fullName: string;
  username: string;
  role: string;
  profileImage: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({ fullName: '', username: '', role: '', profileImage: '' });

  useEffect(()=> {
    void  fetchUserDetails()
  }, [])
  
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<{ user: User }>('/api/users/me');
      // console.log('Single user data: ', response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log('Error while fething user data in rofile');
    }
  };


  //    Tickets
  // 📌 Saved Events
  // ❤️ Liked Events
  // 🎉 Events
  // 📅 Upcoming Events
  // 🔖 Booked Events
  // 🏆 Attended Events
  // 📝 Event Invitations
  // 🎭 Discover Events

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 overflow-hidden rounded-lg bg-white shadow-lg md:w-96">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
            <Image
              src={user.profileImage ?? "/defaultProfile.jpg"}
              width={80}
              height={80}
              className="rounded-full border-4 border-white"
              alt="Profile Picture"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pb-6 pt-14 text-center">
          <h2 className="text-lg font-semibold">{user.fullName}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        {/* Menu */}
        <div className="px-6 pb-6">
          {[
            { icon: '👤', label: 'My Profile' },
            { icon: '💬', label: 'Messages' },
            { icon: '🎟️', label: 'Tickets' },
            { icon: '🏆', label: 'Attended Events' },
            { icon: '📍', label: 'Location' },
            { icon: '⚙️', label: 'Settings' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-200"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-6">
          <Button className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-white">
            🚪 Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
