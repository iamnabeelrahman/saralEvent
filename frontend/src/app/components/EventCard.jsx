import React from "react";
import Link from "next/link";

// Function to generate a slug from the event name (This is for creating clean URLs for each event)
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove non-alphanumeric characters (except hyphens and underscores)
};

const EventCard = ({ event }) => {
  // Function to format the date (This converts the date into a readable format)
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" }; // e.g., 22-Sept-2024
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Use 'en-GB' for day-month-year format
  };

  // Function to format the time (This converts the time into a 12-hour format with AM/PM)
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Converts to 12-hour format with AM/PM
    });
  };

  // Generate a clean URL slug based on the event name (to be used in the event link)
  const slug = generateSlug(event.attributes.Event_Name); 

  return (
    <div className="col-md-4" key={event.id} style={{ marginBottom: "20px" }}>
      <Link href={`/event/${event.id}/${slug}`} passHref>
        <div className="card event-card">
          {/* Check if the event has an image, and use the Cloudinary URL directly */}
          {event.attributes.Display_Picture?.data?.attributes?.url && (
            <img
              // Use the Cloudinary image URL here, which is in event.attributes.Display_Picture.data.attributes.url
              src={event.attributes.Display_Picture.data.attributes.url} 
              className="card-img-top"
              alt={event.attributes.Event_Name}
              style={{
                height: "200px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
          )}
          <div className="card-body" style={{ padding: "20px" }}>
            <h5
              className="card-title"
              style={{ color: "#2c3e50", fontWeight: "bold" }}
            >
              {event.attributes.Event_Name} {/* Display the event name */}
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "14px", color: "#34495e", lineHeight: "1.6" }}
            >
              <span className="card-info">
                <strong style={{ color: "#2980b9" }}>Event ID:</strong>{" "}
                <span>{event.attributes.Event_Id}</span>
              </span>
              <span className="card-info">
                <strong style={{ color: "#2980b9" }}>Date:</strong>{" "}
                <span>{formatDate(event.attributes.Date_and_Time)}</span>
              </span>
              <span className="card-info">
                <strong style={{ color: "#2980b9" }}>Time:</strong>{" "}
                <span>{formatTime(event.attributes.Date_and_Time)}</span>
              </span>
              <span className="card-info">
                <strong style={{ color: "#2980b9" }}>Location:</strong>{" "}
                <span>{event.attributes.Venue}</span>
              </span>
              {event.attributes.Description && (
                <span className="card-info">
                  <strong style={{ color: "#2980b9" }}>Description:</strong>{" "}
                  <span>{event.attributes.Description}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </Link>

      {/* Add custom styling */}
      <style jsx>{`
        .event-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .card-title {
          font-size: 1.5em;
          color: #3498db;
          margin-bottom: 10px;
        }

        .card-text {
          font-size: 1em;
          color: #2c3e50;
        }

        .card-info {
          display: block;
          font-size: 0.95em;
          color: #34495e;
          margin-bottom: 4px;
        }

        .card-info strong {
          color: #2980b9;
          font-weight: 600;
        }

        .card-info span {
          font-weight: 500;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default EventCard;
