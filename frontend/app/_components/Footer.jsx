import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-white mt-4 md:mt-7">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <strong className="block text-xl font-bold sm:text-3xl">
            Stay Updated with the Latest Events!
          </strong>

          <form className="mt-6">
            <div className="relative max-w-lg mx-auto">
              <input
                className="w-full rounded-full border-none bg-gray-700 p-4 pe-32 text-sm text-white placeholder-gray-400"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full ">
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8 text-center lg:text-left">
  {/* About Saral Events */}
  <div>
    <h3 className="text-lg font-semibold mb-4">About Saral Events</h3>
    <p className="text-sm text-gray-400">
      Saral Events is your one-stop destination for finding and exploring
      exciting events happening around you. Join us to make unforgettable
      memories.
    </p>
  </div>

  {/* Quick Links */}
  <div>
    <strong className="font-medium">Quick Links</strong>
    <ul className="mt-6 space-y-1">
      <li>
        <a href="#" className="text-gray-400 hover:text-white">
          Home
        </a>
      </li>
      <li>
        <a href="#" className="text-gray-400 hover:text-white">
          Events
        </a>
      </li>
      <li>
        <a href="#" className="text-gray-400 hover:text-white">
          Contact Us
        </a>
      </li>
      <li>
        <a href="#" className="text-gray-400 hover:text-white">
          About Us
        </a>
      </li>
    </ul>
  </div>

  {/* Contact Us */}
  <div>
    <strong className="font-medium">Contact Us</strong>
    <ul className="mt-6 space-y-1">
      <li className="text-gray-400 flex">
        <span className="font-medium mr-2">Email:</span>
        <span>events@saralgroups.com</span>
      </li>
      <li className="text-gray-400 flex">
        <span className="font-medium mr-2">Phone:</span>
        <span>+91 78272 16955</span>
      </li>
      <li className="text-gray-400 flex">
        <span className="font-medium mr-2">Headquarters:</span>
        <span>Bengaluru, Karnataka</span>
      </li>
    </ul>
  </div>

  {/* Services */}
  <div>
    <strong className="font-medium">Services</strong>
    <ul className="mt-6 space-y-1">
      <li className="text-gray-400">Ticket Selling</li>
      <li className="text-gray-400">Keeping Track</li>
      <li className="text-gray-400">Managing Event</li>
    </ul>
  </div>
</div>

      </div>
    </footer>
  );
}

export default Footer;
