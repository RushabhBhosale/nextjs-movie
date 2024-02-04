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
      <body className={`${inter.className} -mb-48`}>
        <div className='sticky top-0'>
          <Navbar />
        </div>
        <div className="lg:flex mt-4 h-[38rem] overflow-auto">
          <div
            className={`lg:w-[12.5rem] absolute sm:static transition-transform h-[38rem] overflow-auto sidebar ${isSidebarVisible ? 'gayab' : 'hai'
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
