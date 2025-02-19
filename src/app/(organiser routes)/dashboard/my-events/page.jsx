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
    name: "",
    description: "",
    price: null,
    channel: "", // Add any other fields you might need
    creator: null,
    userId: null,
    // paymentMethods: [],
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

  useEffect(() => {
    if (user?.id) {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        creator: user.id,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleCreateEvent = async () => {
    try {
      if (!newEventDetails.channel) {
        toast("Please select a channel.");
        return;
      }
      if (!newEventDetails.creator) {
        toast("Server issue please contact helpline.");
        return;
      }
      if (!newEventDetails.userId) {
        toast("Server issue please contact helpline.");
        console.log("issue at my-event.");
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewEventDetails((prevDetails) => {
      let updatedPaymentMethods = [...prevDetails.paymentMethods];
      if (checked) {
        updatedPaymentMethods.push(value); // Add selected method
      } else {
        updatedPaymentMethods = updatedPaymentMethods.filter(
          (method) => method !== value
        ); // Remove unselected method
      }
      return {
        ...prevDetails,
        paymentMethods: updatedPaymentMethods,
      };
    });
  };

  return (
    <OrganiserLayout>
      <section className="px-6 py-8 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold text-primary text-center mb-8">
          Manage Events
        </h2>

        <div className="flex justify-center items-center w-full">
          <section className="w-full flex flex-col   bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Create New Event
            </h2>

            <div className="md:flex flex-col md:flex-row gap-6 justify-center ">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-purple-600 mb-2">
                  Select Channel
                </h3>
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-full md:w-auto flex items-center gap-3 border rounded-full py-2 px-6 bg-gray-200 text-primary font-medium cursor-pointer"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                      {newEventDetails.channel
                        ? channelsData.find(
                            (channel) =>
                              channel.documentId === newEventDetails.channel
                          )?.name
                        : "Select Channel"}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                    {channelsData.map((channel) => (
                      <DropdownMenuItem
                        key={channel.id}
                        onClick={() => handleChannelSelection(channel)}
                        className={`cursor-pointer ${
                          newEventDetails.channel === channel.documentId
                            ? "bg-blue-200"
                            : ""
                        }`}
                      >
                        <h2>{channel.name}</h2>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="w-[60%]">
                <h3 className="text-lg font-medium text-purple-600 mb-2">
                  Event Name
                </h3>
                <Input
                  type="text"
                  id="event-name"
                  className="w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" // 75% width of the parent container
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Event Description
              </h3>
              <Input
                type="text"
                id="event-description"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter event description"
                value={newEventDetails.description}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Event Price
              </h3>
              <Input
                type="number"
                id="event-price"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter event price"
                value={newEventDetails.price}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    price: e.target.value ? parseFloat(e.target.value) : "",
                  }))
                }
                required
              />
            </div>

            {/* payment options, Owner, Admin, Member, Guest */}

           

            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
               Select Payment Integration
              </h3>

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="stripe"
                  value="stripe"
                  // checked={newEventDetails.paymentMethods.includes("stripe")}
                  // onChange={handleCheckboxChange}
                />
                <label htmlFor="stripe" className="ml-2">
                  Stripe
                </label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="razorpay"
                  value="razorpay"
                  // checked={newEventDetails.paymentMethods.includes("razorpay")}
                  // onChange={handleCheckboxChange}
                />
                <label htmlFor="razorpay" className="ml-2">
                  Razorpay
                </label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="paypal"
                  value="paypal"
                  // checked={newEventDetails.paymentMethods.includes("paypal")}
                  // onChange={handleCheckboxChange}
                />
                <label htmlFor="paypal" className="ml-2">
                  PayPal
                </label>
              </div>

              {/* Show selected payment methods */}
              <div className="mt-4 flex gap-2">
              <h4 className="font-bold">Selected Payment Methods:</h4>
              <ul>
                  {/* {newEventDetails.paymentMethods.length === 0 ? (
                    <li>No payment methods selected.</li>
                  ) : (
                    newEventDetails.paymentMethods.map((method) => (
                      <li className="text-primary"
                       key={method}>{method}</li>
                    ))
                  )} */}
                </ul>
              </div>
            </div>

            <div className="md:flex flex-col md:flex-row gap-6 justify-center md:mt-3">
            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Owner
              </h3>
              <Input
                type="text"
                id="event-owner"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="add owner"
                value={newEventDetails.owners}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    owners: e.target.value ? parseFloat(e.target.value) : "",
                  }))
                }
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Admin
              </h3>
              <Input
                type="text"
                id="event-admin"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="add admin"
                value={newEventDetails.admins}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    admins: e.target.value ? parseFloat(e.target.value) : "",
                  }))
                }
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Member
              </h3>
              <Input
                type="text"
                id="event-member"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="add member"
                value={newEventDetails.members}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    members: e.target.value ? parseFloat(e.target.value) : "",
                  }))
                }
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-600 mb-2">
                Guest
              </h3>
              <Input
                type="text"
                id="event-guest"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="add guest"
                value={newEventDetails.guests}
                onChange={(e) =>
                  setNewEventDetails((prevDetails) => ({
                    ...prevDetails,
                    guests: e.target.value ? parseFloat(e.target.value) : "",
                  }))
                }
              />
            </div>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                handleCreateEvent();
              }}
              className="w-full py-3 font-bold  mt-1 md:mt-3"
            >
              Create Event
            </Button>
          </section>
        </div>

        <div className="bg-white shadow-lg p-8 rounded-xl mt-8">
          <h3 className="text-2xl font-semibold text-primary mb-6">
            Your Events
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {eventsData.map((event) => (
              <li
                key={event.id}
                className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={
                      event.images?.[0]?.url ||
                      "https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg"
                    }
                    alt={"Event image"}
                    width={250}
                    height={250}
                    className="h-[200px] w-[200px] object-cover rounded-lg"
                  />
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-gray-800 truncate">
                      {event.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-2">₹{event.price}</p>
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
