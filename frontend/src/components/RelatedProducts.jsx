import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() =>{
        if(products.length > 0){
            let productCopy = products.slice();
            productCopy = productCopy.filter(product => product.category === category && product.subCategory === subCategory)
            setRelatedProduct(productCopy.slice(0, 5))
        }
    }, [products, category, subCategory])

    
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
                relatedProduct.map((product, index) => (
                    <ProductItem  key={index} id={product._id} image={product.image} name={product.name} price={product.price}/>
                ))
            }

        </div>
    </div>
  )
}

RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default RelatedProducts
