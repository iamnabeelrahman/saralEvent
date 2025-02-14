import React from "react"
import Footer from "@/app/_components/Footer";


export default function contact() {
    return (
      <>
        <div className="px min-h-screen bg-white pt-32 pb-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Headings */}
        <h1 className="text-4xl font-bold t mb-8 text-purple-600 hover:text-gray-800 transition-colors">Contact Us</h1>
        <h2 className=" text-3xl font-bold text-gray-800 mb-4 hover:text-purple-600 transition-colors">Saral Events</h2>

        {/* Contact Information */}
        <div className="space-y-6 text-lg">
          {/* Email */}
          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">Email:</h3>
            <p className="text-gray-800">events@saralgroups.com</p>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">Phone:</h3>
            <p className="text-gray-800">+91 78272 16955</p>
          </div>

          {/* Headquarters */}
          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">Headquarters:</h3>
            <p className="text-gray-800">Bengaluru, Karnataka</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};
