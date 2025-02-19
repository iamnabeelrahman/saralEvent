"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import OrganiserDashboard from "../../../../components/OrganiserComponents/OrganiserDashboard";

const OrganiserPage = () => {
  const [user, setUser] = useState({});

  return (
    <div>
      <OrganiserDashboard user={user} />
    </div>
  );
};

export default OrganiserPage;
