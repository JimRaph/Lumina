import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
  return (
    <div className='min-w-14 md:w-[20%] max-w-[320px] border-r-2 
    sticky top-16 h-[calc(100vh-65px)]'>
      
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
       
        <NavLink 
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' 
          to="/add">
            <div className="relative group">
              <img className='w-5 h-5' src={assets.add_icon} alt="Add Icon" />
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                  w-max max-w-xs rounded bg-black text-white text-sm
                  px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 
                  transition-opacity whitespace-nowrap z-50 md:hidden">
                Add Items
              </span>
            </div>
            <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink 
          className='flex relative items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' 
          to="/list">
            <div className="relative group">
              <img className='w-5 h-5' src={assets.parcel_icon} alt="Add Icon" />
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                  w-max max-w-xs rounded bg-black text-white text-sm
                  px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 
                  transition-opacity whitespace-nowrap z-50 md:hidden">
                List Items
              </span>
            </div>
            <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink 
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' 
          to="/orders">
            <div className="relative group">
              <img className='w-5 h-5' src={assets.order_icon} alt="Add Icon" />
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                  w-max max-w-xs rounded bg-black text-white text-sm 
                  px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 
                  transition-opacity whitespace-nowrap z-50 md:hidden">
                Orders
              </span>
            </div>
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
