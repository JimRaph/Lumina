import { currency } from "../util/utils";
import { BACKEND_URL } from "../util/utils";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Proptypes from 'prop-types'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      console.log("No token");
      return null;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/order/list`,
        {},
        { headers: { token } }
      );
      console.log(response.data.orders);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [token]);

  const statusHandler = async(e, orderId) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/order/status`,
        {orderId, status:e.target.value},
        { headers: { token } }
      )
      console.log(response.data)
      if(response.data.success){
        await fetchOrders()
      }
    } catch (error) {
      console.log('error updating order status frontend: ', error.message)
      toast.error('error updating order status frontend')
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token, fetchOrders]);

const formatItems = (items) => {
    return items.map((item, index) => (
      <span key={index} className="block py-0.5">
        <span className="font-medium">{item.name}</span> x {item.qty} ({item.size})
        {index < items.length - 1 ? ', ' : ''}
      </span>
    ));
  };
  
  return (
    <div className='bg-white p-4 md:p-6 rounded-xl shadow-lg border border-emerald-100'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-emerald-100">Order History</h2>
      
      <div className="flex flex-col gap-5">
        
        {orders.map((order, index) => (
          
          <div className="p-4 md:p-5 border border-emerald-200 rounded-xl shadow-sm hover:shadow-md transition-shadow 
            duration-200 bg-white grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr]
            lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-center text-sm text-gray-700" 
            key={index}>
            
            <img className="w-8 md:w-10 mt-1" src={assets.parcel_icon} alt="Parcel Icon" />
            
            <div>
              <p className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1">Products:</p>
              <div className="text-xs md:text-sm mb-3">
                {formatItems(order.items)}
              </div>
              
              <p className="mt-2 mb-1 font-medium text-gray-900 border-t border-gray-100 pt-1">Customer Info:</p>
              <p className="font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="text-xs">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>{order.address.zipcode}, {order.address.country}</p>
                <p className="mt-1 font-medium text-emerald-600">{order.address.phone}</p>
              </div>
            </div>
            
            <div>
              <p className="text-gray-900 font-bold mb-2">Summary:</p>
              <p className="mb-1">Items: <span className="font-semibold">{order.items.length}</span></p>
              <p className="mb-1">Method: {order.paymentMethod}</p>
              <p className="mb-1">Payment: <span className={`font-semibold ${order.payment ? 'text-emerald-500' : 'text-red-500'}`}>{order.payment ? 'Paid' : 'Pending'}</span></p>
              <p className="mb-1">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            

            <p className="text-lg font-extrabold text-emerald-600 sm:text-right">
              {currency}{order.amount}
            </p>

            <select 
              onChange={(e) =>statusHandler(e, order._id)}
              value={order.status} 
              className="p-3 font-semibold border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50
               focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}


        {orders.length === 0 && (
          <p className="text-center py-8 text-gray-500">No current orders.</p>
        )}
      </div>
    </div>
  );
};


Orders.propTypes = {
  token: Proptypes.string.isRequired
}
export default Orders;
