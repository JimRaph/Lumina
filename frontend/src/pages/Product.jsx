import { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const {productId} = useParams()
  const [productData, setProductData] = useState(null)
  const {products, currency, addToCart} = useContext(ShopContext)
  const [image, setImage] = useState(null)
  const [sizeData, setSizeData] = useState(null)

  const getProductData = useCallback(() => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [products, productId]);

  useEffect(()=>{
    getProductData()
  }, [productId, products, getProductData])

  return productData ? (
    <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t border-gray-800 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      <div className='flex gap-10 sm:gap-16 flex-col sm:flex-row'>

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start sm:justify-start sm:w-[15%] w-full'>
            {
              productData.image.map((img, index) =>(
                <div key={index} className={`p-1 rounded-lg transition-colors border-2 ${img === image ? 'border-emerald-500 shadow-md' : 'border-gray-800 hover:border-gray-600'}`}>
                    <img 
                        onClick={() => setImage(img)} 
                        src={img} 
                        className='w-[24vw] h-auto sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover rounded-md filter brightness-90' 
                        alt={`Product thumbnail ${index + 1}`} 
                    />
                </div>
              ))
            }
          </div>

          <div className='w-full sm:w-[85%] rounded-xl overflow-hidden shadow-2xl'>
            <img className='w-full h-auto object-cover' src={image} alt={productData.name} />
          </div>
        </div>

        <div className='flex-1 p-2'>
            <h1 className='font-extrabold text-3xl text-gray-100'>{productData.name}</h1>
            
            <div className='flex items-center gap-1 mt-3'>
              <img src={assets.star_icon} alt="Star" className='w-4 filter brightness-200' />
              <img src={assets.star_icon} alt="Star" className='w-4 filter brightness-200' />
              <img src={assets.star_icon} alt="Star" className='w-4 filter brightness-200' />
              <img src={assets.star_icon} alt="Star" className='w-4 filter brightness-200' />
              <img src={assets.star_dull_icon} alt="Dull Star" className='w-4 filter brightness-200 opacity-50' />
              <p className='pl-2 text-gray-400'>(122 Reviews)</p>
            </div>
            
            <p className='mt-5 text-4xl font-bold accent-text'>{currency}{productData.price}</p>
            
            <p className='mt-5 text-gray-400 md:w-4/5'>{productData.description}</p>
            
            <div className='flex flex-col gap-3 my-8'>
              <p className='text-lg font-semibold text-gray-200'>Select Size</p>
              <div className='flex gap-3'>
                {productData.sizes.map((size, index) => (
                  <button 
                    onClick={() => setSizeData(size)} 
                    key={index} 
                    className={`bg-gray-800 text-gray-300 font-medium px-4 py-2 rounded-lg transition-all border-2 
                                ${size === sizeData ? 'border-emerald-500 text-emerald-400' : 'border-gray-700 hover:border-gray-500'} 
                                `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
                onClick={() => addToCart(productData._id, sizeData)} 
                className='w-4/5 bg-emerald-500 text-gray-900 font-bold px-8 py-3 text-lg rounded-full 
                           hover:bg-emerald-400 shadow-xl shadow-emerald-700/50 transition-all duration-300 disabled:opacity-50'
                disabled={!sizeData}
            >
                {sizeData ? 'ADD TO CART' : 'SELECT SIZE'}
            </button>
            
            <hr className='mt-10 sm:w-4/5 border-gray-800' />
            
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-2'>
                <p>— <span className='text-gray-400'>100% Original product</span></p>
                <p>— <span className='text-gray-400'>Cash on delivery is available</span></p>
                <p>— <span className='text-gray-400'>30-day return policy applies</span></p>
            </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex border-b border-gray-800'>
          <b className='bg-[#1a1a1a] border-b-2 border-emerald-500 text-gray-100 px-6 py-3 text-base font-semibold cursor-pointer transition-colors'>Description</b>
          <p className='bg-transparent text-gray-400 hover:text-gray-200 px-6 py-3 text-base font-medium cursor-pointer transition-colors'>Reviews (122)</p>
        </div>
        
        <div className='flex flex-col gap-4 bg-[#1a1a1a] rounded-b-lg p-6 text-base text-gray-400 shadow-inner'>
            <p>{productData.long_desc}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='h-40 text-center text-gray-400 pt-20'>Loading Product Data...</div>
}
export default Product