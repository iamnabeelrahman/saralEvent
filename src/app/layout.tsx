import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import './globals.css';
import ClientSideLayout from './ClientSideLayout'; // Import client-side layout

const inter = Inter({ subsets: ['latin'] });
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

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Saral Events',
  description: 'Events for everyone',
  icons: {
    icon: '/logo.svg', // Use the path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ClientSideLayout>{children}</ClientSideLayout> {/* Wrap client-side layout */}
      </body>
    </html>
  );
}
