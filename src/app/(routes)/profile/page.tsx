"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const defaultImage = "https://via.placeholder.com/150"; 

const UserProfilePage = () => {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      fetchUserDetails(token);
    } else {
      setIsLoading(false);
      setMessage("Please log in to view your profile.");
    }
  }, []);

  const fetchUserDetails = async (token: string) => {
    // Your fetch logic here
    console.log("Fetching user details with token:", token);
  };

  const handleUpdate = async () => {

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Image
              src="/defaultProfile.jpg" // Replace with your image path
              width={80}
              height={80}
              className="rounded-full border-4 border-white"
              alt="Profile Picture"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-6 text-center">
          <h2 className="text-lg font-semibold">Nabeel Rahman</h2>
          <p className="text-gray-500 text-sm">Software Developer</p>
        </div>

        {/* Menu */}
        <div className="px-6 pb-6">
          {[
            { icon: "👤", label: "My Profile" },
            { icon: "💬", label: "Messages" },
            { icon: "🎟️", label: "Tickets" },
            { icon: "🏆", label: "Attended Events" },
            { icon: "📍", label: "Location" },
            { icon: "⚙️", label: "Settings" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-6">
          <Button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white">
            🚪 Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
