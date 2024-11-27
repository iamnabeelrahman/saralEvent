// src/app/event/[id]/[slug]/page.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/EventDetails.module.css";

const EventDetails = ({ params }) => {
  const { id, slug } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://saralevent.onrender.com/api/events/${id}?populate=*`
        );
        if (!response.ok) throw new Error("Failed to fetch event details");
        const data = await response.json();
        setEvent(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event || !event.attributes) return <div>Event not found.</div>;

  const { Event_Name, Date_and_Time, Venue, Display_Picture, Description } =
    event.attributes;

  if (
    slug !==
    Event_Name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
  ) {
    router.push("/404");
    return null;
  }

  const imageUrl = Display_Picture?.data?.attributes?.formats?.large?.url
    ? `https://saralevent.onrender.com${Display_Picture.data.attributes.formats.large.url}`
    : `https://saralevent.onrender.com${Display_Picture.data.attributes.url}`;

  return (
    <div className={styles.container}>
      {imageUrl && <img src={imageUrl} alt={Event_Name} className={styles.image} />}
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{Event_Name}</h1>
        <p className={styles.description}>{Description}</p>
        <p className={styles.info}>
          <strong>Date:</strong>{" "}
          {new Date(Date_and_Time).toLocaleDateString("en-GB")}
        </p>
        <p className={styles.info}>
          <strong>Time:</strong>{" "}
          {new Date(Date_and_Time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        <p className={styles.info}>
          <strong>Location:</strong> {Venue}
        </p>
        <button className={styles.button}>Show Interest</button>
      </div>
    </div>
  );
};

export default EventDetails;
