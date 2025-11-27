import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/cartTotal'
import { toast } from 'react-toastify'

const Cart = () => {

  const { products, currency, cartItems, token, updateCartItemQty, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [_isDel, setIsDel] = useState(false)

  const handleCheckOut = (e) => {
    e.preventDefault();

    try {
      if (!token) {
        console.log('User not logged in, redirecting to login...') 
        navigate('/login', { state: { from: '/cart' } })
      } else {
        navigate('/place-order')
      }
    } catch (error) {
      toast.error("An error occurred during checkout preparation.")
      console.log('error redirecting user: ', error)
    }
  }

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            qty: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t border-gray-800 pt-14'>

      <div className='text-2xl mb-6'>
        <Title text1={'YOUR'} text2={'SHOPPING CART'} />
      </div>

      <div className='space-y-4'>
        {cartData.length === 0 && (
            <p className='text-center text-gray-500 py-10'>Your cart is currently empty. Start shopping now!</p>
        )}
        
        {
          cartData.map((cartItem, index) => {
            const productData = products.find((product) => product._id === cartItem._id);
            
            if (!productData) return null;

            return (
              <div key={index} className='p-4 bg-[#1a1a1a] rounded-xl shadow-lg transition-shadow grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                
                <div className='flex items-center gap-6'>
  
                  <img className='w-16 sm:w-20 rounded-md filter brightness-90' src={productData.image[0]} alt='' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium text-gray-200'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-lg font-bold accent-text'>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-0.5 border border-emerald-500 text-emerald-400 text-xs sm:text-sm bg-gray-900 rounded'>{cartItem.size}</p>
                    </div>
                  </div>
                </div>
                

                <input
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateCartItemQty(cartItem._id, cartItem.size, Number(e.target.value))}
                  className='bg-gray-800 text-gray-200 border border-gray-700 max-w-16 sm:max-w-20 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 hide-number-input-spinners'
                  type='number' min={1}
                  value={cartItem.qty}
                />
                
                <img 
                  onClick={() => {
                    setIsDel(true)
                    updateCartItemQty(cartItem._id, cartItem.size, 0)
                  }}
                  className='w-5 mr-4 sm:w-6 cursor-pointer filter brightness-200 hover:scale-110 hover:opacity-100 opacity-80 transition-all duration-200'
                  src={assets.bin_icon} 
                  alt='Remove item' 
                />
              </div>
            )
          })
        }
      </div >

      <div className='w-full my-20'>
        <CartTotal />
        
        <div className='flex items-center justify-around py-10'>
          <button
            onClick={(e) => handleCheckOut(e)}
            className='w-full bg-emerald-500 text-gray-900 sm:w-[80%] py-4 text-base font-bold rounded-full 
                       hover:bg-emerald-400 shadow-xl shadow-emerald-700/50 transition-all duration-300'
            disabled={cartData.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart