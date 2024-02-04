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
      <body className={`${inter.className}`}>
        <div className='sticky navbar top-0'>
          <Navbar toggle={toggleSidebar} />
        </div>
        <div className="lg:flex sm:mt-4 sm:h-[38rem] overflow-auto">
          <div
            className={`lg:w-[12.5rem] absolute -mt-1 sm:static transition-transform overflow-auto sidebar ${isSidebarVisible ? 'gayab' : 'hai'
              }`}
          >
            <Sidebar />
          </div>
          <div className="lg:w-[82rem] sm:w-full bg-[#1a1820] rounded-tl-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
