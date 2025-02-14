import axios, { AxiosResponse } from "axios";

// Define types for the responses and parameters
interface Category {
  id: string;
  name: string;
}

interface Event {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  click: number;
}

interface ListItem {
  eventName: string;
  quanity: number;
  amount: number;
  image: string;
  actualPrice: number;
  id: string;
  documentId: string;
}

interface User {
  username: string;
  email: string;
}

interface UserDetails {
  id: string;
  username: string;
  role: string;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

const getCategory = (): Promise<AxiosResponse<Category[]>> => axiosClient.get("/categories?populate=*");

const getCategoryList = (): Promise<Category[]> =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);

const getSlider = (): Promise<any[]> =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getAllEvent = (): Promise<Event[]> =>
  axiosClient.get("/events?populate=*").then((res) => res.data.data);

const getEventsByCategory = (category: string): Promise<Event[]> =>
  axiosClient
    .get(`/events?filters[category][name][$in]=${category}&populate=*`)
    .then((res) => res.data.data);

const createUser = (username: string, email: string, password: string): Promise<AxiosResponse<any>> =>
  axiosClient.post("/auth/local/register", {
    username,
    email,
    password,
  });

const SignIn = (email: string, password: string): Promise<AxiosResponse<any>> =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password,
  });

const addToList = (data: any, jwt: string): Promise<AxiosResponse<any>> =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getListItems = (userId: string, jwt: string): Promise<ListItem[]> =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&populate[events][populate][images][fields]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      return data.map((item: any) => ({
        eventName: item?.events?.[0]?.name,
        quanity: item?.Quantity,
        amount: item?.amount,
        image: item?.events[0].images[0].url,
        actualPrice: item?.events[0].price,
        id: item?.id,
        documentId: item.documentId,
      }));
    });

const deleteListItem = (documentId: string, jwt: string): Promise<AxiosResponse<any>> =>
  axiosClient.delete(`/user-carts/${documentId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const increaseClick = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const eventResponse = await axiosClient.get(`/events/${id}`);
    const currentClick = eventResponse.data.data.click;
    const updatedClick = currentClick + 1;

    return await axiosClient.put(`/events/${id}`, {
      data: { click: updatedClick },
    });
  } catch (error) {
    console.error("Error updating click count:", error);
    throw error;
  }
};

const getUserData = async (name: string): Promise<User | undefined> => {
  try {
    const res = await axiosClient.get(`/users?filters[username][$eq]=${name}`);
    return res.data[0];
  } catch (err) {
    console.error("Error getting user data:", err);
    throw err;
  }
};

const fetchUserDetails = async (token: string): Promise<UserDetails> => {
  try {
    const response = await axiosClient.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error("Error fetching user role:", error.response?.data || error.message);
    throw error;
  }
};

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
  increaseClick,
  getUserData,
  fetchUserDetails,
};
