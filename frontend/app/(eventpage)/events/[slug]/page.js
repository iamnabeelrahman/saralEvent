"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

async function getEventBySlug(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${slug}?populate=*`);
    if (!res.ok) {
    throw new Error("Event not found");
  }
  return res.json();
}

export default function EventPage({ params }) {
  const { slug } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventBySlug(slug)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const formatCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <Image
            src={event.data.images?.[0]?.url}
            alt="Event Image"
            width={350}
            height={350}
            className="rounded-lg object-cover border border-gray-300 shadow-sm"
          />
        </div>

        {/* Event Details */}
        <div className="flex flex-col gap-6">
          {/* Event Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.data.title}</h1>

          {/* Event Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Event Description</h2>
            <p className="text-gray-600 leading-relaxed">{event.data.description || "No description available"}</p>
          </div>

          {/* Ticket Price */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Price</h2>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency.format(event.data.price)}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Select Quantity</h2>
            <select className="p-2 border border-gray-300 rounded-md shadow-sm">
              {[1, 2, 3, 4, 5].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
