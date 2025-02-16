"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// const defaultImage = "https://via.placeholder.com/150"; 

const UserProfile = ({params}: any) => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Image
              src="/defaultProfile.jpg"
              width={80}
              height={80}
              className="rounded-full border-4 border-white"
              alt="Profile Picture"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-6 text-center">
            <h2>{params.username}</h2>
          <h2 className="text-lg font-semibold">Nabeel Rahman</h2>
          <p className="text-gray-500 text-sm">Software Developer</p>
        </div>      
      </div>
    </div>
  );
};

export default UserProfile;
