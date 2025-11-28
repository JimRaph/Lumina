

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-[#1a1a1a] pt-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

            <div>
                <Link to='/'> 
                    <p className="text-3xl font-extrabold text-white tracking-widest cursor-pointer">
                        SHOP<span className="accent-text">LUMINA</span>
                    </p>
                </Link>
                <p className='w-full md:w-2/3 text-gray-400'>
                Get quality and boost your confidence. Explore our curated collections.
                </p>
            </div>

            <div>
                <p className='text-xl font-bold mb-5 accent-text'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-400'>
                    <li className='hover:text-white cursor-pointer transition-colors'>HOME</li>
                    <li className='hover:text-white cursor-pointer transition-colors'>ABOUT US</li>
                    <li className='hover:text-white cursor-pointer transition-colors'>DELIVERY</li>
                    <li className='hover:text-white cursor-pointer transition-colors'>PRIVACY POLICY</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-bold mb-5 accent-text'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-400'>
                    <li>PHONE: +234 815 813 8933</li>
                    <li>EMAIL: naruto@gmail.com</li>
                    <li>ADDRESS: 26 Konoha Village</li>
                </ul>
            </div>
        </div>

        <div>
            <hr className='border-gray-700' />
            <p className='py-5 text-sm text-center text-gray-500'>© 2025 Jimmy. All rights reserved. | Built with Next.js and Tailwind CSS</p>
        </div>
      
    </div>
  )
}

export default Footer