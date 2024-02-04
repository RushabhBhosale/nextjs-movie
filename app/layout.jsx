'use client'
import { useEffect, useState } from 'react';
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
      <body className={`${inter.className} pages overflow-hidden`}>
        <div className='sticky navbar top-0'>
          <Navbar toggle={toggleSidebar} />
        </div>
        <div className="lg:flex mt-4 overflow-auto">
          <div
            className={`absolute sidebar -mt-1 sm:static transition-transform overflow-auto sidebar ${isSidebarVisible ? 'gayab' : 'hai'
              }`}
          >
            <Sidebar />
          </div>
          <div className=" sm:w-full page bg-[#1a1820] rounded-tl-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
