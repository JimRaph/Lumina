import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Proptypes from 'prop-types'


const Navbar = ({ setToken }) => { 
    const navigate = useNavigate();

    const logout = () => {
        setToken(""); 
        localStorage.removeItem("token");
        navigate('/'); 
        toast.success("Logged out successfully");
    };

    return (
        <div className='sticky top-0 flex items-center py-3 px-4 sm:px-8 justify-between
         bg-white border-b border-emerald-100 shadow-lg z-30 h-16'>
            
            <div className="flex items-center gap-4">

                <h1 
                    onClick={() => navigate('/list')}
                    className='text-2xl sm:text-3xl font-bold cursor-pointer tracking-wider'
                >
                    <span className="text-gray-900">SHOP</span>
                    <span className="text-emerald-500">LUMINA</span>
                </h1>
            </div>


            <div className='flex items-center gap-4'>
                
                <button
                    onClick={logout}
                    className='bg-emerald-500 text-white px-4 py-2 
                               rounded-full text-sm font-semibold transition-colors 
                               hover:bg-emerald-600 shadow-md shadow-emerald-500/30'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

Navbar.propTypes ={
    setToken: Proptypes.func.isRequired,
}

export default Navbar;