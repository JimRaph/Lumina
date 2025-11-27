import  { useContext } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from './Title'

const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)
    const subtotal = getCartAmount();

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'SUMMARY'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{(subtotal+delivery_fee).toFixed(2)}</p>
        </div>
     </div>
    </div>
  )
}

export default CartTotal
