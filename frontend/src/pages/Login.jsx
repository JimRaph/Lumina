import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopCreateContext';
import { BACKEND_URL } from '../util/URL';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Login');
  const { token, setToken, loggedIn, setLoggedIn } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign up') {
        const response = await axios.post(`${BACKEND_URL}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success('User registered successfully. Please log in.');
          setToken(response.data.token); 
          localStorage.setItem('token', response.data.token);
          setState('Login');
        } else {
          toast.error(response.data.message);
        }
      }

      if (state === 'Login') {
        const response = await axios.post(`${BACKEND_URL}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          setLoggedIn(true);
          navigate(from, { replace: true }); 
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('error processing login/register request: ', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (token && loggedIn && state === 'Login') {
      navigate(from, { replace: true }); 
    }
  }, [token, loggedIn, state, navigate, from]);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-[90%] sm:max-w-[550px] m-auto mt-14 mb-20 p-8 sm:p-12 gap-5 
                 bg-[#1a1a1a] rounded-xl shadow-2xl shadow-gray-900 text-gray-200"
    >
      
      <div className="inline-flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold text-white">{state}</h2>
        <hr className="border-none h-[2px] w-10 bg-emerald-500" />
      </div>

      {state !== 'Login' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 
                     focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-500"
          placeholder="Full Name"
          type="text"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 
                   focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-500"
        placeholder="Email Address"
        type="email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 
                   focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-500"
        placeholder="Password"
        type="password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-0 text-gray-400">
        <p className="cursor-pointer hover:text-emerald-400 transition-colors">Forgot your password?</p>
        
        {state === 'Login' ? (
          <p onClick={() => setState('Sign up')} className="cursor-pointer font-medium hover:text-white transition-colors">
            New here? <span className='accent-text'>Create an account</span>
          </p>
        ) : (
          <p onClick={() => setState('Login')} className="cursor-pointer font-medium hover:text-white transition-colors">
            Already have an account? <span className='accent-text'>Login Here</span>
          </p>
        )}
      </div>

      <button 
        className="w-full bg-emerald-500 text-gray-900 font-bold py-3 mt-4 text-base rounded-lg 
                   hover:bg-emerald-400 shadow-lg shadow-emerald-700/50 transition-all duration-300"
      >
        {state === 'Login' ? 'Log In' : 'Create Account'}
      </button>
    </form>
  );
};

export default Login;