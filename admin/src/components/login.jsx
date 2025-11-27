import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../util/utils";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";


const Login = ({setToken}) =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmitHandler = async (e) => {
        
        try {
            e.preventDefault();
            const response = await axios.post(`${BACKEND_URL}/api/user/admin`, {email, password})
            if(response.data.success){
               setToken(response.data.token)
            } else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return(

        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
         <div className="bg-white shadow-2xl rounded-xl p-10 max-w-sm w-full border border-gray-100">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">Admin Login</h1>
          <form onSubmit={onSubmitHandler}>
           <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Email Address</p>
            <input
             onChange={(e)=>setEmail(e.target.value)}
             className="rounded-md w-full px-4 py-2 border border-gray-300 outline-none 
                focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors text-gray-800"
             type="text" placeholder="admin@example.com" required 
            />
           </div>
           <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Password</p>
            <input
             onChange={(e)=>setPassword(e.target.value)}
             className="rounded-md w-full px-4 py-2 border border-gray-300 outline-none 
                focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors text-gray-800"
             type="password" placeholder="••••••••" required 
            />
           </div>
           <button 
            className='w-full py-2.5 px-4 rounded-lg text-gray-900 bg-emerald-500 font-bold 
               hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/30'
            type="submit"
           >
            SIGN IN TO ADMIN PANEL
           </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">For authorized administrators only.</p>
         </div>
        </div>
)
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;