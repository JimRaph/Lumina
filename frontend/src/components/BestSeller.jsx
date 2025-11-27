import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        setBestSeller(products.filter(product=>product.bestseller).slice(0,5))
    }, [products])

  return (
    <div className='my-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='text-center py-8'>
            <Title text1={'TOP'} text2 = {'SELLERS'} />
            <p className='w-3/4 m-auto text-sm md:text-base text-gray-300 mt-2'>
            Most people buy more of these. Beautiful, Quality, and Confidence.
            </p>
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10'>
            {
                bestSeller.map((product,index) => (
                    <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}/>
                ))
            }
        </div>
    </div>
  )
}
export default BestSeller