import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]"> 
            <div className="bg-white border border-emerald-100 rounded-xl 
                shadow-xl shadow-emerald-500/10 p-8 sm:p-12 md:p-16 
                text-gray-800 w-full max-w-2xl">
                
                {assets.dashboard_icon && ( 
                    <img 
                        src={assets.dashboard_icon} 
                        alt="Dashboard Icon" 
                        className="w-24 h-24 mb-6 mx-auto" 
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.2))' }} 
                    />
                )}
                
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                    Welcome, <span className="text-emerald-500">Admin</span>!
                </h2>
                <p className="text-lg text-gray-600 mb-6 text-center max-w-xl mx-auto">
                    Your central hub for managing Lumina E-commerce.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={() => navigate('/add')}
                        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full 
                                   hover:bg-emerald-600 transition-all duration-200 
                                   shadow-lg shadow-emerald-500/40 text-base"
                    >
                        + Add New Product
                    </button>
                    <button 
                        onClick={() => navigate('/list')}
                        className="bg-white text-emerald-600 font-semibold py-3 px-8 rounded-full 
                                   hover:bg-emerald-50 transition-colors border border-emerald-300 text-base"
                    >
                        View All Products
                    </button>
                </div>

                <p className="text-sm text-gray-400 mt-10 text-center">
                    Navigate using the sidebar to explore all features.
                </p>
            </div>
        </div>
    );
};
export default Welcome;