const axios = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://saralevent-backend.onrender.com/api",
  timeout: 10000, // 10 seconds timeout
});

const getCategoryList = async () => {
  try {
    const res = await axiosClient.get("/categories?populate=*");
    return res.data.data || [];
  } catch (error) {
    console.error("Failed to fetch category list:", error);
    return [];
  }
};

const getSlider = async () => {
  try {
    const res = await axiosClient.get("/sliders?populate=*");
    return res.data.data || [];
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
    return [];
  }
};

const getAllEvent = async () => {
  try {
    const res = await axiosClient.get("/events?populate=*");
    return res.data.data || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export default {
  getCategoryList,
  getSlider,
  getAllEvent,
};
