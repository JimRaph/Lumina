import PropTypes from 'prop-types';
import  { useContext } from 'react'
import { ShopContext } from '../context/ShopCreateContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext)

  return (
    <Link 
        className='bg-[#1a1a1a] rounded-xl p-3 shadow-xl hover:shadow-emerald-900/60 transition-all duration-300 group' 
        to={`/product/${id}`}
    >
        <div className='overflow-hidden relative rounded-lg'>
   
            <img 
                className='hover:scale-110 transition-transform duration-500 rounded-lg filter brightness-70 opacity-80' 
                src={image[0]} 
                alt={name} 
            />
        </div>
        
        <p className='pt-3 pb-1 text-base text-gray-300 font-medium group-hover:text-white transition-colors'>{name}</p>
        
        <p className='text-xl font-bold accent-text'>{currency}{price}</p>
        
    </Link>
  )
}

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductItem
