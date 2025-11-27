import axios from 'axios'
import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../util/utils'
import {toast} from 'react-toastify'
import PropTypes from 'prop-types';



const List = ({token}) => {

  const [list, setList] = useState([])

  const getProductList = async() =>{
      try {
        const response = await axios.get(`${BACKEND_URL}/api/product/list`)
        if(response.data.success){
          setList(response.data.products)
        }else{
          toast.error(response.data.message)
          console.log('error getting product list',)
        }
        
      } catch (error) {
        console.log('error getting product list')
        console.log(error.message)
      }
  }

  const handleDelete = async(id) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/product/remove`, {id}, {headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await getProductList()
      }else{
        toast.error(response.data.message)
        console.log('error deleting product',)
      }
      
    } catch (error) {
      console.log('error deleting product')
      console.log(error.message)
    }
  }

  console.log(list)

  useEffect(()=>{
    getProductList()
  }, [])

return (
    <div className='bg-white p-4 md:p-6 rounded-xl shadow-lg border border-emerald-100'> 
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-emerald-100">All Product List</h2>

      <div className='flex flex-col gap-3'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1.5fr_1fr_1fr] items-center py-2 px-4 font-semibold text-gray-700 bg-emerald-50 rounded-lg'>
          <b className='text-center'>Image</b>
          <b className=''>Name</b>
          <b className=''>Category</b>
          <b className='text-right'>Price</b>
          <b className='text-center'>Action</b>
        </div>

        
        {
          list.length > 0 ? (
            list.map((item, index) => (
              
              <div key={index} className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md 
                                         grid grid-cols-1 gap-2 md:grid-cols-[1fr_3fr_1.5fr_1fr_1fr] md:gap-4 md:items-center'>
                
                <div className='md:justify-self-center'>
                  <img src={item.image[0]} alt={item.name} className='w-14 h-14 object-cover rounded-md' />
                </div>
                
                <div className='md:text-left font-semibold text-gray-800 md:col-start-2'>
                  <span className='md:hidden text-sm text-gray-500 font-normal'>Name: </span> 
                  {item.name}
                </div>
                
                <div className='text-gray-600 md:text-left'>
                  <span className='md:hidden text-sm text-gray-500 font-normal'>Category: </span>
                  {item.category} {item.subcategory}
                </div>
                
                <div className='text-emerald-600 font-bold md:text-right'>
                  <span className='md:hidden text-sm text-gray-500 font-normal'>Price: </span>
                  ${item.price.toFixed(2)}
                </div>
                
                <div className='md:justify-self-center pt-2 md:pt-0'>
                  <button 
                    onClick={()=>handleDelete(item._id)}
                    className='bg-red-500 text-white font-bold py-1 px-3 rounded-full text-xs 
                               hover:bg-red-600 transition-colors shadow-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center py-8 text-gray-500'>No products found in the list.</p>
          )
        }
      </div>
    </div>
  )
}

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List
