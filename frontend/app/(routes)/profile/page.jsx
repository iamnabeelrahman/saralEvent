"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import OrganiserPage from "@/app/_components/OrganiserComponents/OrganiserPage";
import OrganiserDashboard from "@/app/_components/OrganiserComponents/OrganiserDashboard";
import { useRouter } from "next/navigation";

const defaultImage = "https://via.placeholder.com/150"; 

const UserProfilePage = () => {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useState(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Load the JWT and fetch user details
    const storedJwt = sessionStorage.getItem("jwt");
    if (storedJwt) {
      setJwt(storedJwt);
      fetchUserDetails(storedJwt);
    } else {
      setIsLoading(false);
      setMessage("Please log in to view your profile.");
    }
  }, []);

  const fetchUserDetails = (token) => {
    axios
      .get("http://localhost:1337/api/users/me?populate=*", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const fetchedUser = response.data;
        setUser({
          ...fetchedUser, // Keep all original properties
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          location: fetchedUser.location || "",
          bio: fetchedUser.bio || "",
          profileImage: fetchedUser.profileImage?.url,
          userId: fetchedUser.id,
          role: fetchedUser.role?.name || "",
        });
      })
      .catch(() => setMessage("Failed to load user details."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (user.role !== "Organiser") {
      router.push("/dashboard"); // Redirect to /dashboard
    }
  }, [user.role, router]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${user.userId}`,
        {
          name: user.name,
          email: user.email,
          location: user.location,
          bio: user.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setMessage("Profile updated successfully!");
      const updatedUser = response.data;
      setUser({
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        bio: updatedUser.bio,
      });
    } catch (err) {
      setMessage("Failed to update profile. Please try again.");
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user.role === "Organiser" ? (
        <OrganiserDashboard user={user} jwt={jwt} />
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Account Profile
          </h1>
          {message && (
            <p className="text-center text-red-500 mb-4">{message}</p>
          )}
          <div className="flex justify-center mb-6">
            <Image
              src={user.profileImage || "/defaultUserImage.png"}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover"
              width={96}
              height={96} // equivalent to 24rem
            />
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Role</label>
              <input
                type="role"
                value={user.role}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Bio</label>
              <textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                rows="3"
              />
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full bg-purple-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Update
            </button>
          </form>

          <div className="text-center mt-4">
            {
              user.role === "Authenticated" ? (
                <a
                  href="/register-organisation"
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  <h5>Register as organiser</h5>
                </a>
              ) : user.role === "Organiser" ? (
                <a
                  href="/manage-event"
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  <h5>Manage your events</h5>
                </a>
              ) : null 
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
