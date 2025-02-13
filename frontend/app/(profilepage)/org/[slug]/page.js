'use client'
import React , {useEffect, useState}  from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';


async function getEventBySlug(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[username][$eq]=${slug}`);
    if (!res.ok) {
    throw new Error("Event not found");
  }
  return res.json();
}

const page =  ({params}) => {
    const [user, setuser] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } =  React.use(params); 
    useEffect(()=>{
        // const data =  GlobalApi.getUserData(slug)
        // console.log(data)
        getEventBySlug(slug).then((data)=>{
            console.log(data[0])
            setuser(data[0])
            setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } , [slug])

    
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!user) {
    return <p>No user data available.</p>;
  }
    return (

        
        <div>
          <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] p-6 max-w-sm w-full">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-full rounded-md h-full  object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user?.username || "jhon does"}'s  Profile</h2>
          <p className="text-sm text-gray-500 mt-1">
            Last Login: {new Date(user?.lastLogin || Date.now()).toLocaleString()}
          </p>
          {/* <p className="text-sm text-gray-500">
            {user?.device || "Device: Windows 10 Pro, New York (US)"}
          </p> */}
        </div>

        {/* User Information */}
        <div className="mt-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-800">{user?.username || "jhon does"}</p>
            <p className="text-gray-600">{user?.email || "sami.rahman0021@gmail.com"}</p>
            <p className="text-gray-600">{user?.bio || "+1-856-569-969-1236"}</p>
          </div>

          {/* SMS Alerts Section */}
          

        </div>

       
      </div>
    </div>
        </div>
    )
}

export default page
