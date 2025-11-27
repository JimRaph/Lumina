import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const location = useLocation();
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
    if(location.pathname.includes('collection')){
    setVisible(true)
    }
    else{
    setVisible(false)
    }
    }, [location])
        
    const ICON_FILTER = 'filter invert sepia-0 saturate-100 brightness-100 transition-all duration-200';

    return showSearch && visible ? (
    <div className='border-t border-b border-gray-800 bg-gray-950 text-center py-7'>
    <div className='inline-flex items-center justify-center 
                    border-2 border-gray-700 bg-gray-900 focus-within:border-emerald-400 transition-colors 
                    px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
    <input 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)} 
        className='flex-1 outline-none bg-inherit text-gray-200 placeholder-gray-500 text-sm' 
        type='text' 
        placeholder='Search products...' 
    />
    <img className={`w-5 cursor-pointer ${ICON_FILTER}`} src={assets.search_icon} alt='Search icon' />
    </div>
    <img 
        onClick = {()=>setShowSearch(false)} 
        className={`inline w-4 h-4 cursor-pointer align-middle transition-transform ${ICON_FILTER} hover:brightness-150`} 
        src={assets.cross_icon} 
        alt='Close search' 
    />
    </div>
    ) : null
    }

export default SearchBar