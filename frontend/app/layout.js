import localFont from "next/font/local";
import "./globals.css";
import { Montserrat as GoogleMontserrat } from "next/font/google";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Rename to avoid conflict
const montserratFont = GoogleMontserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
