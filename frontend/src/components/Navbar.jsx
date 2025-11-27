import { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopCreateContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const {setShowSearch, getCartCount, navigate, token, setToken} = useContext(ShopContext)

    const handleLogOut = async() =>{
        try {
            localStorage.removeItem('token')
            setToken('')
            await navigate('/login')
            console.log('user logged out')
        } catch (error) {
            console.error('error logging out: ',error)
        }
    }

  return (
    <div className='sticky top-0 z-50 flex items-center justify-between py-5 font-medium sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#1a1a1a] shadow-xl w-full px-4'>      

        <div className='flex items-center gap-6 '>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden filter 
            invert sepia-0 saturate-100 brightness-100 transition-all duration-200' alt='' />

            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer filter
            invert sepia-0 saturate-100 brightness-100 transition-all duration-200 hover:opacity-80' alt='' />

            <div className='group relative '>
                <img onClick={() => token ? "" : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer filter 
                invert sepia-0 saturate-100 brightness-100 transition-all duration-200 hover:opacity-80' alt='' />
                
                {token ? 
                    <div className='group-hover:block hidden absolute dropdown-menu  pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-gray-800 text-gray-300 rounded shadow-2xl'>
                        {/* <p className='cursor-pointer hover:text-emerald-400'>My Profile</p> */}
                        <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-emerald-400'> Orders</p>
                        <p onClick={handleLogOut} className='cursor-pointer hover:text-emerald-400'>Logout</p>
                    </div>
                </div>
                    :
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-gray-800 text-gray-300 rounded shadow-2xl'>
                        <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-emerald-400'>Log In</p>
                    </div>
                </div>
                }
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5 filter invert sepia-0 saturate-100 brightness-100 transition-all duration-200' alt='' />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-emerald-400
                 text-gray-900 font-bold aspect-square rounded-full text-[8px]'>
                {getCartCount()}
                </p>
            </Link>
        </div>


        <ul className='hidden sm:flex gap-8 text-sm text-gray-300 uppercase tracking-widest'>
            <NavLink to='/' className='flex flex-col items-center gap-1 group hover:text-emerald-400 transition-colors'>
                <p>HOME</p>
                <hr className='w-full border-none h-[2px] bg-emerald-400 hidden group-hover:block' />
            </NavLink>

            <NavLink to='/collection' className='flex flex-col items-center gap-1 group hover:text-emerald-400 transition-colors'>
                <p>COLLECTION</p>
                <hr className='w-full border-none h-[2px] bg-emerald-400 hidden group-hover:block' />
            </NavLink>
            
            <NavLink to='/about' className='flex flex-col items-center gap-1 group hover:text-emerald-400 transition-colors'>
                <p>ABOUT</p>
                <hr className='w-full border-none h-[2px] bg-emerald-400 hidden group-hover:block' />
            </NavLink>

            <NavLink to='/contact' className='flex flex-col items-center gap-1 group hover:text-emerald-400 transition-colors'>
                <p>CONTACT</p>
                <hr className='w-full border-none h-[2px] bg-emerald-400 hidden group-hover:block' />
            </NavLink>
        </ul>

        <Link to='/'> 
            <p className="text-3xl font-extrabold text-white tracking-widest cursor-pointer">
                LUM<span className="accent-text">INA</span>
            </p>
        </Link>


        <div 
            onClick={() => setVisible(false)} 
            className={`fixed top-0 left-0 bottom-0 right-0 bg-black/80 z-[100] transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={`w-[75vw] max-w-[300px] h-full bg-gray-900 shadow-2xl transition-transform duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='flex flex-col text-gray-300 pt-4'>
                    
                    <div onClick={()=>setVisible(false)} className='cursor-pointer flex items-center gap-4 p-4 border-b border-gray-800 text-white bg-gray-800 hover:bg-gray-700 transition-colors'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180 filter brightness-200' alt='Back arrow' />
                        <p className='font-semibold'>Back to Site</p>
                    </div>
                    
                    <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b border-gray-800 hover:bg-gray-800 hover:text-emerald-400 transition-colors uppercase' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)}className='py-3 pl-6 border-b border-gray-800 hover:bg-gray-800 hover:text-emerald-400 transition-colors uppercase' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)}className='py-3 pl-6 border-b border-gray-800 hover:bg-gray-800 hover:text-emerald-400 transition-colors uppercase' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)}className='py-3 pl-6 border-b border-gray-800 hover:bg-gray-800 hover:text-emerald-400 transition-colors uppercase' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
        
    </div>
  )
}
export default Navbar