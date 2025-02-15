// "use client";
// import OrganiserDashboard from "@/app/_components/OrganiserComponents/OrganiserDashboard";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

// const OrganiserPage = () => {
//   const [user, setUser] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const storedJwt = sessionStorage.getItem("jwt");

//     if (!storedJwt) {
//       alert("Please log in to view your profile.");
//       router.push("/sign-in");
//       return;
//     }

//     // Fetch user details if JWT is found
//     axios
//       .get("http://localhost:1337/api/users/me?populate=*", {
//         headers: { Authorization: `Bearer ${storedJwt}` },
//       })
//       .then((response) => {
//         const fetchedUser = response.data;
//         setUser({
//           ...fetchedUser, // Keep all original properties
//           name: fetchedUser.name || "",
//           email: fetchedUser.email || "",
//           location: fetchedUser.location || "",
//           bio: fetchedUser.bio || "",
//           profileImage: fetchedUser.profileImage?.url,
//           userId: fetchedUser.id,
//           role: fetchedUser.role?.name || "",
//         });
//       })
//       .catch(() => {
//         alert("Failed to load user details. Please log in again.");
//         router.push("/sign-in");
//       })
//       .finally(() => setIsLoading(false));
//   }, [router]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <OrganiserDashboard user={user} jwt={sessionStorage.getItem("jwt")} />
//     </div>
//   );
// };

// export default OrganiserPage;
