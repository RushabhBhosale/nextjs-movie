'use client'
import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <div className='sticky navbar py-1 top-0 '>
          <Navbar toggle={toggleSidebar} />
        </div>
        <div className="lg:flex">
          <div
            className={`absolute sidebar sm:static transition-transform sidebar overflow-auto ${isSidebarVisible ? 'gayab' : 'hai'
              }`}>
            <Sidebar />
          </div>
          <div className=" sm:w-full page bg-[#1a1820] rounded-tl-xl -mt-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
