// "use client"
// import { useEffect, useState } from 'react';

// export default function Dashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Function to fetch protected data
//     const fetchDashboard = async () => {
//       try {
//         const response = await fetch('/api/dashboard', {
//           method: 'GET',
//           credentials: 'include',  // Important: send cookies with the request
//         });

//         if (response.status === 200) {
//           const data = await response.json();
//           setUser(data.user);
//         } else if (response.status === 401) {
//           // If the access token is expired, try refreshing the token
//           await refreshAccessToken();
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard:', error);
//       }
//     };

//     // Function to refresh access token using refresh token
//     const refreshAccessToken = async () => {
//       try {
//         // Request to the server to refresh the access token using the refresh token
//         const refreshResponse = await fetch('/api/refresh-token', {
//           method: 'POST',
//           credentials: 'include', // Send cookies automatically with the request
//         });

//         if (refreshResponse.status === 200) {
//           // Successfully refreshed the access token, retry fetching dashboard data
//           await fetchDashboard();
//         } else {
//           // If the refresh token is also expired, redirect to login
//           window.location.href = '/login';
//         }
//       } catch (error) {
//         console.error('Error refreshing access token:', error);
//         window.location.href = '/login';
//       }
//     };

//     // Initial fetch of dashboard data
//     fetchDashboard();
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Welcome, {user}</h1>
//       <p>This is a protected dashboard route.</p>
//     </div>
//   );
// }
