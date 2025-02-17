import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-white mt-4 md:mt-7 w-full bottom-0">
      <div className="mx-auto max-w-screen-xl px-4 pb-4 pt-6 sm:pb-6 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <strong className="block text-lg font-bold sm:text-3xl">
            Stay Updated with the Latest Events!
          </strong>

          <form className="mt-3 sm:mt-6">
            <div className="relative max-w-lg mx-auto">
              <input
                className="w-full rounded-full border-none bg-gray-700 p-2 sm:p-4 pe-32 text-sm text-white placeholder-gray-400"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-sm">
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 text-center lg:text-left">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-1 mb-4 lg:mb-0">
              <h3 className="text-lg font-semibold mb-2">About Saral Events</h3>
              <p className="text-sm text-gray-400">
                Saral Events is your one-stop destination for finding and
                exploring exciting events happening around you. Join us to make
                unforgettable memories.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between lg:col-span-3">
              {/* Quick Links */}
              <div className="mb-4 sm:mb-0">
                <strong className="font-medium">Quick Links</strong>
                <ul className="mt-2 sm:mt-4 space-y-1">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="/contactus" className="text-gray-400 hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="mb-4 sm:mb-0">
                <strong className="font-medium">Contact Us</strong>
                <ul className="mt-2 sm:mt-4 space-y-1">
                  <li className="text-gray-400 flex justify-center sm:justify-start">
                    <span className="font-medium mr-2">Email:</span>
                    <span>events@saralgroups.com</span>
                  </li>
                  <li className="text-gray-400 flex justify-center sm:justify-start">
                    <span className="font-medium mr-2">Phone:</span>
                    <span>+91 78272 16955</span>
                  </li>
                  <li className="text-gray-400 flex justify-center sm:justify-start">
                    <span className="font-medium mr-2">Headquarters:</span>
                    <span>Bengaluru, Karnataka</span>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <strong className="font-medium">Services</strong>
                <ul className="mt-2 sm:mt-4 space-y-1">
                  <li className="text-gray-400">Ticket Selling</li>
                  <li className="text-gray-400">Keeping Track</li>
                  <li className="text-gray-400">Managing Event</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;