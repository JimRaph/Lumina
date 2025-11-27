import { useContext, useState, useEffect, useCallback } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from '../components/Title'
import { BACKEND_URL } from '../util/URL'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const {token, currency} = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  const getOrders = useCallback( async() =>{

    try {
      if(!token){
        console.log("No token found in orders");
        toast.error('You are not logged in.')
        return null;
      }
      const response = await axios.post(`${BACKEND_URL}/api/order/userorders`,
        {},
        {headers:{token}}
      )

        if(response.data.success){
          let allOrders = []
          response.data.orders.map((order) => {
            order.items.map((orderinfo) => {
              orderinfo['status'] = order.status
              orderinfo['payment'] = order.payment
              orderinfo['paymentMethod'] = order.paymentMethod
              orderinfo['date'] = order.date
              allOrders.push(orderinfo)
            })
          })
          setOrders(allOrders.reverse())
          
        } else {
          console.log('Error fetching orders: Success was false')
        }
    } catch (error) {
      console.log('Error fetching orders', error.message)

    }

  }, [token]) 

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-500';
      case 'Delivered':
        return 'bg-emerald-500';
      case 'Cancelled':
        return 'bg-red-500';
      case 'Shipped':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t border-gray-800 pt-16'>

      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      {orders.length === 0 && (
          <p className='text-center text-gray-500 py-20'>You have no order history yet.</p>
      )}

      <div className='space-y-6'>
        {
          orders.map((order, index) =>(
            <div key={index} 
            className='p-5 bg-[#1a1a1a] rounded-xl shadow-xl hover:shadow-emerald-900/40 transition-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6'>


              <div className='flex items-start gap-6 text-sm flex-1'>
                <img className='w-16 sm:w-20 rounded-md filter brightness-90' src={order.image[0]} alt={order.name} />
                <div className='flex flex-col gap-1'>
                  <h3 className='text-lg font-bold text-gray-200'>{order.name}</h3>
                  <div className='flex items-center gap-4 mt-1 text-sm text-gray-400'>
                    <p className='text-xl font-bold accent-text'>{currency}{order.price}</p>
                    <p>Qty: <span className='text-gray-200'>{order.qty}</span></p>
                    <p>Size: <span className='text-gray-200'>{order.size}</span></p>
                  </div>
                  <p className='mt-3 text-gray-500'>Date: <span className='text-gray-400'>{new Date(order.date).toDateString()}</span></p>
                  <p className='text-gray-500'>Method: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                </div>

              </div>

              <div className='md:w-1/3 flex justify-between items-center gap-1'>
                
                <div className='flex items-center gap-3'>
                  <p className={`min-w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></p>
                  <p className='text-base font-semibold text-gray-300'>{order.status}</p>
                </div>
                
                <button 
                  onClick={() => getOrders(token)} 
                  className='border border-emerald-500 text-emerald-400 px-6 py-2 text-sm font-medium rounded-full 
                             hover:bg-emerald-500 hover:text-gray-900 transition-all duration-300'
                >
                  TRACK ORDER
                </button>

              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders