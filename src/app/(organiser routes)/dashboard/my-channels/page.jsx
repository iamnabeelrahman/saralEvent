"use client";
import OrganiserApi from "@/app/_utils/OrganiserApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import OrganiserLayout from "@/app/_components/OrganiserComponents/layout";

const OrganiserPage = () => {
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    creator: user.id,
    userId: user.id,
  });
  const [channelsData, setChannelsData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (jwt) {
        setIsSignedIn(true);
        setUser(user);
        setJwt(jwt);
      }
    }
  }, []);

  const [newChannelDetails, setNewChannelDetails] = useState({
    creator: null,
    userId: null,
  });

  useEffect(() => {
    if (user && user.id) {
      setNewChannelDetails((prevDetails) => ({
        ...prevDetails,
        creator: user.id,
        userId: user.id,
      }));
    }
    else{
      console.log("user not available at my-channel");
      
    }
  }, [user])


  useEffect(() => {
    if (user && jwt) {
      fetchOrganiserChannels();
    }
  }, [user, jwt]);

  const fetchOrganiserChannels = async () => {
    try {
      const response = await OrganiserApi.getOrganiserAllChannelData(
        user.id,
        jwt
      );
      setChannelsData(response.data); // Store the channel data in state
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const handleCreateChannel = async () => {
    try {
      if (!newChannelDetails.creator || !newChannelDetails.userId) {
        console.error("Creator and UserId are missing");
        toast("Error: Missing creator or userId");
        return;
      }
  
      const response = await OrganiserApi.createChannel(
        { data: newChannelDetails },
        jwt
      );
      fetchOrganiserChannels();
      setNewChannelDetails((prevDetails) => ({
        ...prevDetails,
        name: "",
        description: "",
      }));
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      if (!newEventDetails.channel) {
        toast("Please select a channel.");
        return;
      }
      if (!newEventDetails.name) {
        toast("Please fill event name.");
        return;
      }
      if (!newEventDetails.description) {
        toast("Please fill description of event.");
        return;
      }

      if (isNaN(newEventDetails.price)) {
        toast("Please enter a valid price.");
        return;
      }

      // Log data before sending to API
      console.log("Creating event with data:", newEventDetails);

      const response = await OrganiserApi.createEvent(
        { data: newEventDetails },
        jwt
      );

      // Reset event details after successful creation
      setNewEventDetails({
        ...newEventDetails,
        name: "",
        description: "",
        price: null,
        // channel: "",
      });
      toast("Event created successfully!");
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response ? error.response.data : error.message
      );
      toast(
        "Error creating event: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleChannelSelection = (channel) => {
    setNewEventDetails((prevState) => ({
      ...prevState,
      channel: channel.documentId,
    }));
    setIsDropdownOpen(false);
  };

  return (
    <OrganiserLayout>
    <section className="p-6 ">
  <h2 className="text-3xl font-bold mb-6 text-primary text-center">
    Manage Channels
  </h2>

  <div className="bg-white shadow-lg p-8 rounded-md relative">
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => setIsCreatingChannel(true)}
            className="text-primary font-medium hover:underline transition-all"
          >
            + Create Channel
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="channel-name"
                  className="block font-semibold text-lg text-purple-600"
                >
                  Channel Name
                </label>
                <Input
                  type="text"
                  id="channel-name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-400"
                  placeholder="Enter channel name"
                  value={newChannelDetails.name}
                  onChange={(e) =>
                    setNewChannelDetails((prevDetails) => ({
                      ...prevDetails,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="channel-description"
                  className="block font-semibold text-lg text-purple-600"
                >
                  Description
                </label>
                <Input
                  id="channel-description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-400"
                  placeholder="Enter channel description"
                  value={newChannelDetails.description}
                  onChange={(e) =>
                    setNewChannelDetails((prevDetails) => ({
                      ...prevDetails,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateChannel();
                }}
                className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-all"
              >
                Create Channel
              </Button>
            </form>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Channels List */}
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
      {channelsData.map((channel) => (
        <li
          key={channel.id}
          className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg text-gray-800 truncate">
              {channel.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {channel.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

    </OrganiserLayout>
  );
};

export default OrganiserPage;
