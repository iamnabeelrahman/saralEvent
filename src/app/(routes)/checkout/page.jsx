// "use client";
// import GlobalApi from "@/app/_utils/GlobalApi";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { ArrowBigRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function Checkout() {
//   const [jwt, setJwt] = useState(null);
//   const [user, setUser] = useState(null);
//   const [totalListItem, setTotalListItem] = useState(0);
//   const [listItemDetails, setListItemDetails] = useState([]);
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [subtotal, setSubtotal] = useState(0);
//   const router = useRouter();
//   const [name, setName] = useState(false);
//   const [email, setEmail] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const jwt = sessionStorage.getItem("jwt");
//       const user = JSON.parse(sessionStorage.getItem("user"));
//       if (jwt) {
//         setIsSignedIn(true);
//         setUser(user);
//         setJwt(jwt);
//       }
//     }
//   }, []);

//   // getting the list of items(events) that user has added to its cart
//   useEffect(() => {
//     if (user && jwt) {
//       getListItems();
//     }
//   }, [user, jwt]);

//   //get items list
//   const getListItems = async () => {
//     if (!user || !jwt) return;
//     try {
//       const listItems_ = await GlobalApi.getListItems(user.id, jwt);
//       console.log("Fetched List Items:", listItems_);
//       setTotalListItem(listItems_?.length || 0);
//       setListItemDetails(listItems_ || []);
//     } catch (error) {
//       console.error("Error fetching list items:", error);
//     }
//   };

//   useEffect(() => {
//     let total = 0;
//     listItemDetails.forEach((element) => {
//       total = total + element.amount;
//     });
//     setSubtotal(total.toFixed(2));
//   }, [listItemDetails]);

//   const calculateTotalAmount = () => {
//     const totalAmount = (parseFloat(subtotal) || 0) * 1.09; // Add 9% tax
//     return totalAmount > 0 ? totalAmount.toFixed(2) : "0.01"; // Default to a minimal valid amount
//   };

//   const taxAmount = (subtotal * 0.09).toFixed(2); // Tax amount

//   return (
//     <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto mt-5 md:mt-20">
//       <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
//         Checkout
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Billing Details */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Billing Details
//           </h2>
//           <div className="flex flex-col gap-4">
//             <Input
//               placeholder="Name"
//               className="border-gray-300 focus:ring-purple-600 focus:border-purple-600"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Input
//               placeholder="Email"
//               className="border-gray-300 focus:ring-purple-600 focus:border-purple-600"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               placeholder="Phone Number"
//               className="border-gray-300 focus:ring-purple-600 focus:border-purple-600"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Order Summary
//           </h2>
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//             <h3 className="text-gray-600 text-sm font-medium mb-2">
//               Total Tickets ({totalListItem})
//             </h3>
//             <div className="flex justify-between text-gray-700 mb-2">
//               <span>Subtotal:</span>
//               <span className="font-semibold">{subtotal}</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between text-gray-700 mb-2">
//               <span>Tax (9%):</span>
//               <span className="font-semibold">{taxAmount}</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between text-gray-900 font-semibold text-lg">
//               <span>Total:</span>
//               <span>{calculateTotalAmount()}</span>
//             </div>

//             {subtotal > 0 && (
//               <PayPalButtons
//                 style={{ layout: "horizontal" }}
//                 createOrder={(data, actions) => {
//                   return actions.order.create({
//                     purchase_units: [
//                       {
//                         amount: {
//                           value: calculateTotalAmount(),
//                           currency_code: "USD",
//                         },
//                       },
//                     ],
//                   });
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
