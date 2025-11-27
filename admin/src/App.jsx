import Navbar from "./components/navbar";
import  { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/add";
import List from "./pages/list";
import Orders from "./pages/order";
import Login from "./components/login";
import {ToastContainer} from 'react-toastify';
import Welcome from "./components/welcome";


const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') :
    '');

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (
    <div className="bg-gray-50">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className="flex w-full ">
            <Sidebar />
            
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] py-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
