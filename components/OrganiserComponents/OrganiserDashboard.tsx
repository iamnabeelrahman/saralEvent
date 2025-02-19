import React from "react";
import OrganiserLayout from "./layout";
interface User {
  fullName: string;
  username: string;
  role: string;
  profileImage: string;
}

interface OrganiserDashboardProps {
  user: User;
}

const OrganiserDashboard: React.FC<OrganiserDashboardProps> = ({ user }) => {
  const loggedIn = {
    fullName: "Nabeel Rahman",
    username: "iamnabeelrahman",
    role: "Organiser",
    profileImage: "/defaultProfile.jpg"
  };

  return (
    <OrganiserLayout>
    <section className="no-scrollbar   flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-900">
              {"Welcome"}

              <span className="text-primary">&nbsp;{user?.fullName}</span>
            </h1>
            <p className="text-sm lg:text-xl font-normal text-gray-600">
              {"Your gateway to manage events."}
            </p>
          </div>
        </div>
      </div>

      <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] overflow-hidden">
        <section className="flex flex-col pb-8">
          <div className="h-[120px] w-full bg-gradient-to-r from-purple-300 to-purple-100 bg-cover bg-no-repeat" />

          <div className="relative flex px-6">
            <div className="flex justify-center items-center absolute -top-8 w-24 h-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
              <span className="text-5xl font-bold text-primary">
                {user.fullName[0]}
              </span>
            </div>

            <div className="flex flex-col pt-24">
              <h1 className="text-2xl font-semibold text-gray-900">
                {user.fullName} 
              </h1>
              <p className="text-base font-normal text-gray-600">
                {user.role}
              </p>
            </div>
          </div>
        </section>
      </aside>

    </section>
    </OrganiserLayout>
  );
};

export default OrganiserDashboard;
