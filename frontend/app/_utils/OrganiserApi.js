const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

// API Calls for Organizer Actions
const getOrganiserAllChannelData = (userId, jwt) =>
  axiosClient
    .get(`/channels?filters[userId][$eq]=${userId}&populate=*`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((res) => res.data);

const createChannel = (data, jwt) =>
  axiosClient.post("/channels", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const getOrganiserAllEvents = async (userId, jwt) => {
    const url = `http://localhost:1337/api/events?filters[creator][$eq]=${userId}&populate=*`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("api data: ",data);
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Rethrow the error so it can be caught in the calling function
    }
  };
  
  

const updateChannel = (id, data) => axiosClient.put(`/channels/${id}`, data);
const deleteChannel = (id) => axiosClient.delete(`/channels/${id}`);

const getEventsByChannel = (channelId) =>
  axiosClient.get(`/channels/${channelId}/events`);

const createEvent = async (data, jwt) => {
  try {
    const response = await axiosClient.post(`/events`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const updateEvent = (channelId, eventId, data) =>
  axiosClient.put(`/channels/${channelId}/events/${eventId}`, data);
const deleteEvent = (channelId, eventId) =>
  axiosClient.delete(`/channels/${channelId}/events/${eventId}`);

const sendGoogleCalendarInvite = (data) =>
  axiosClient.post("/google-calendar/invite", data);
const addGoogleMeetLink = (eventId, data) =>
  axiosClient.post(`/events/${eventId}/google-meet`, data);

const addAdminToChannel = (channelId, adminId) =>
  axiosClient.post(`/channels/${channelId}/admins`, { adminId });
const removeAdminFromChannel = (channelId, adminId) =>
  axiosClient.delete(`/channels/${channelId}/admins/${adminId}`);

export default {
  getOrganiserAllChannelData,
  createChannel,
  updateChannel,
  deleteChannel,
  getOrganiserAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  sendGoogleCalendarInvite,
  addGoogleMeetLink,
  addAdminToChannel,
  removeAdminFromChannel,
};
