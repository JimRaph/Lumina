import { useCallback, useContext } from 'react'
import {useSearchParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopCreateContext'
import { BACKEND_URL } from '../util/URL'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

const VerifyPage = () => {

    const {navigate, token} = useContext(ShopContext)
    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    console.log(success)
    console.log(token)
    console.log(orderId)

    const verifyPayment = useCallback(async () => {
    if (token && orderId && success) {
        try {
        const response = await axios.post(
            `${BACKEND_URL}/api/order/verifystripe/${orderId}`,
            { orderId, success },
            { headers: { token } }
        );
        if (response.data.payment === true) {
            // setCartItems({});
            navigate('/orders');
        } else {
            navigate('/cart');
        }
        } catch (error) {
        toast.error('Error verifying stripe: ' + error.message);
        }
    }
    }, [token, navigate, orderId, success]);

    useEffect(()=>{
        verifyPayment()
    }, [token, verifyPayment])

  return (
    <div>
      
    </div>
  )
}

export default VerifyPage
