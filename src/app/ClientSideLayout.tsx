'use client'; // Ensures that this component runs client-side

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"; // Ensure this path is correct
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UpdateListContext } from 'context/UpdateListContext';
import Header from 'components/Header';

interface ClientSideLayoutProps {
  children: React.ReactNode;
}

export default function ClientSideLayout({ children }: ClientSideLayoutProps) {
  const pathname = usePathname(); // Using more descriptive variable name
  const [updateList, setUpdateList] = useState(false);

  // Hide header for sign-in and create-account pages
  const showHeader = !['/sign-in', '/create-account'].includes(pathname);

  return (
    // <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID }}>
      <UpdateListContext.Provider value={{ updateList, setUpdateList }}>
        {showHeader && <Header />} 
        {children}
        <Toaster />
      </UpdateListContext.Provider>
    // </PayPalScriptProvider>
  );
}
