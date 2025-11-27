import { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from './Title'
import ProductItem from './ProductItem' 

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

   useEffect(() => {
    const latest = products.slice(0, 10);
    setLatestProducts((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(latest)) {
        return latest;
        }
        return prev;
    });
    }, [products, latestProducts]);



  return (
    <div className='my-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='text-center py-8'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-sm md:text-base text-gray-300 mt-2'>
            Our newest arrivals, featuring cutting-edge design and quality.
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10'>
            {
                latestProducts.map((product,index) => (
                    <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}/>
                ))
            }
        </div>
    </div>
  )
}
export default LatestCollection