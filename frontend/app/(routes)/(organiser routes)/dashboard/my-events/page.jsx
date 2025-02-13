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
import Image from "next/image";
import OrganiserLayout from "@/app/_components/OrganiserComponents/layout";

const OrganiserPage = () => {
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [jwt, setJwt] = useState(null);

  
  const [newChannelDetails, setNewChannelDetails] = useState({
    creator: user.id,
    userId: user.id,
  });

  const [channelsData, setChannelsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [newEventDetails, setNewEventDetails] = useState({
    creator: user.id,
    userId: user.id,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (user?.id && jwt) {
      fetchOrganiserEvents();
    }
  }, [user, jwt, newChannelDetails]);

  // Fetch events data from API
  const fetchOrganiserEvents = async () => {
    try {
      const response = await OrganiserApi.getOrganiserAllEvents(user.id, jwt);
      setEventsData(response.data); // This sets the events data from the API response.
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Log eventsData when it changes
  useEffect(() => {
    console.log("events data: ", eventsData);
  }, [eventsData]);

  useEffect(() => {
    if (user && jwt) {
      fetchOrganiserChannels();
      console.log(channelsData);
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

  // remove this
  const handleCreateChannel = async () => {
    try {
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
          Manage Events
        </h2>

        <div className="bg-white shadow-lg p-8 rounded-md relative">
          <div className="flex justify-end">
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <button
            // onClick={() => setIsCreatingChannel(true)}
            className="text-primary font-medium hover:underline transition-all"
          >
            + Create Event
          </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
            <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Manage Events
          </h2>

          <div className="bg-white shadow-lg p-6 rounded">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <h2
                  className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-gray-200 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
                >
                  {newEventDetails.channel
                    ? channelsData.find(
                        (channel) =>
                          channel.documentId === newEventDetails.channel
                      )?.name
                    : "Select Channel"}
                </h2>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                {channelsData.map((channel) => (
                  <DropdownMenuItem
                    key={channel.id}
                    onClick={() => handleChannelSelection(channel)} // Set the channel documentId in newEventDetails state
                    className={`cursor-pointer ${
                      newEventDetails.channel === channel.documentId
                        ? "bg-blue-200" // Highlight selected channel
                        : ""
                    }`}
                  >
                    <h2>{channel.name}</h2>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mb-4">
              <h2 className="font-bold text-xl text-purple-600 transition-colors">
                Event Name
              </h2>
              <Input
                type="text"
                id="event-name"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter event name"
                value={newEventDetails.name}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    name: e.target.value,
                  }))
                }
                required
              />
              <h2 className="font-bold text-xl text-purple-600 transition-colors">
                Event Description
              </h2>
              <Input
                type="text"
                id="event-description-name"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter event Description"
                value={newEventDetails.description}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    description: e.target.value,
                  }))
                }
                required
              />
              <h2 className="font-bold text-xl text-purple-600 transition-colors">
                Price
              </h2>
              <Input
                type="number"
                id="event-price"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter event price"
                value={newEventDetails.price}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    price: e.target.value ? parseFloat(e.target.value) : "", // Convert to number
                  }))
                }
                required
              />
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                handleCreateEvent();
              }}
              className="w-full py-2 bg-primary"
            >
              Create Event
            </Button>
          </div>
        </section>
              {/* <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <h2
                  className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-gray-200 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
                >
                  {newEventDetails.channel
                    ? channelsData.find(
                        (channel) =>
                          channel.documentId === newEventDetails.channel
                      )?.name
                    : "Select Channel"}
                </h2>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                {channelsData.map((channel) => (
                  <DropdownMenuItem
                    key={channel.id}
                    onClick={() => handleChannelSelection(channel)} // Set the channel documentId in newEventDetails state
                    className={`cursor-pointer ${
                      newEventDetails.channel === channel.documentId
                        ? "bg-blue-200" // Highlight selected channel
                        : ""
                    }`}
                  >
                    <h2>{channel.name}</h2>
                    
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu> */}
            </DropdownMenuLabel>
          

            <DropdownMenuSeparator />
           
          </DropdownMenuContent>
        </DropdownMenu>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
            {eventsData.map((event) => (
              <li
                key={event.id}
                className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Event Image */}
                  <Image
                    src={
                      event.images?.[0]?.url ||
                      "https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg"
                    }
                    alt={"Event image"}
                    width={200}
                    height={200}
                    className="h-[150px] md:h-[200px] w-[150px] md:w-[250px] object-contain rounded-md"
                  />

                  {/* Event Details */}
                  <div className="flex flex-col items-center space-y-2">
                    <h3 className="font-bold text-lg text-gray-800 truncate">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 text-sm">₹{event.price}</p>
                  </div>
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
