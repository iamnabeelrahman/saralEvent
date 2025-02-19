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

const OrganiserPage = ({ user, jwt }) => {
  const [newChannelDetails, setNewChannelDetails] = useState({
    creator: user.id,
    userId: user.id,
  });
  const [channelsData, setChannelsData] = useState([]);
  const [newEventDetails, setNewEventDetails] = useState({
    creator: user.id,
    userId: user.id,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, <span className="text-primary"> {user.name}</span>
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Manage Channels
        </h2>

        <div className="bg-white shadow-lg p-6 rounded">
          {/* Channels List */}
          <ul className="space-y-4 mb-6">
            {channelsData.map((channel) => (
              <li
                key={channel.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{channel.name}</h3>
                  <p className="text-sm text-gray-500">{channel.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => setIsCreatingChannel(true)}
                className="w-full py-2 bg-primary"
              >
                Add Channel
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="mb-4">
                  <h2 className="font-bold text-xl text-purple-600 transition-colors">
                    Channel Name
                  </h2>
                  <Input
                    type="text"
                    id="channel-name"
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                <div className="mb-4">
                  <h2 className="font-bold text-xl text-purple-600 transition-colors">
                    Description
                  </h2>
                  <Input
                    id="channel-description"
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                  className=" text-white py-2 rounded-md"
                >
                  Create Channel
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Manage Events
        </h2>

        <div className="bg-white shadow-lg p-6 rounded">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
      {/* <div className="bg-white shadow-lg p-6 rounded">
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
          </div> */}
    </div>
  );
};

export default OrganiserPage;
