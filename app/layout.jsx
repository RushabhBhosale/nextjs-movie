'use client'
import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex mt-4">
          <div
            className={`lg:w-[12.5rem] transition-transform sidebar ${
              isSidebarVisible ? 'gayab' : 'hai'
            }`}
          >
            <Sidebar />
          </div>
          <div className="w-[82rem] bg-[#1a1820] rounded-tl-xl">{children}</div>
        </div>
        <button className="toggle-btn sm:hidden" onClick={toggleSidebar}>
          Toggle Sidebar
        </button>
      </body>
    </html>
  );
}
