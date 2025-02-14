'use client'; // Ensures that this component runs client-side

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"; // Ensure this path is correct
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UpdateListContext } from 'context/UpdateListContext';
import Header from 'components/Header';

export default function ClientSideLayout({ children }:any) {
  const params = usePathname(); 
  const [updateList, setUpdateList] = useState(false);

  // Determine whether to show the header based on the path
  const showHeader = params === '/sign-in' || params === '/create-account' ? false : true;

  return (
    // <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID }}>
      <UpdateListContext.Provider value={{ updateList, setUpdateList }}>
        {showHeader && <Header />} 
        {children}
        <Toaster />
      </UpdateListContext.Provider>
    // {/* </PayPalScriptProvider> */}
  );
}
