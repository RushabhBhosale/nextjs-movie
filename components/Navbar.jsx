import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
   return (
      <div className='h-12 flex my-2 mt-5 items-center justify-between px-16'>
         <Image src={`/logo.png`} alt='logo' width={150} height={53}/>
         <div className='relative'>
            <input type="text" className="relative h-12 w-80 bg-gray-50ring-0 bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500  focus:border-gray-500 block focus:px-3 transition-all px-6" placeholder="Search ..." />
            <MagnifyingGlassIcon className='w-6 h-6 absolute top-3 right-3' />
         </div>
      </div>
   )
}

export default Navbar