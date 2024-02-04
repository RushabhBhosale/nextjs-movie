import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = ({ toggle }) => {
   return (
      <div className='sm:h-12 flex sm:my-2 sm:mt-5 items-center justify-between px-6 lg:px-16'>
         <button className="toggle-btn sm:hidden" onClick={toggle}>
            <Bars3Icon className='w-6 h-6' />
         </button>
         <Image src={`/logo.png`} alt='logo' width={120} height={45} />
         <div className='relative'>
            <input type="text" className="relative w-40 h-8 sm:h-12 sm:w-80 bg-gray-50ring-0 bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500  focus:border-gray-500 block focus:px-3 transition-all px-6" placeholder="Search ..." />
            <MagnifyingGlassIcon className='lg:w-6 lg:h-6 w-3 h-3 absolute  top-3 right-3' />
         </div>
      </div>
   )
}

export default Navbar