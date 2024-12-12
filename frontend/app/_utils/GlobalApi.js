const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "https://saralevent-backend.onrender.com/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getAllEvent = () =>
  axiosClient.get("/events?populate=*").then((res) => {
    return res.data.data;
  });

const getEventsByCategory = (category) =>
  axiosClient
    .get("/events?filters[categories][name][$in]=" + category + "&populate=*")
    .then((res) => {
      return res.data.data;
    });

const createUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToList = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getListItems = (userId, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&populate[events][populate][images][fields]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const listItems = data.map((item, index) => ({
        // Access the first event in the events array and its name
        // event: item.events[0], // Assuming there is at least one event
        // Now access the name of the event and the URL of its first image (if exists)
        eventName: item?.events[0].name,
        quanity: item?.Quantity,
        amount: item?.amount,
        image: item?.events[0].images[0].url,
        actualPrice: item?.events[0].price,
        id: item?.id,
        documentId: item.documentId,
      }));
      return listItems;
    });

const deleteListItem = (documentId, jwt) =>
  axiosClient.delete(`/user-carts/${documentId}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getAllEvent,
  getEventsByCategory,
  createUser,
  SignIn,
  addToList,
  getListItems,
  deleteListItem,
};
