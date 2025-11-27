import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {BACKEND_URL} from '../util/utils'
import {toast} from 'react-toastify'
import PropTypes from 'prop-types';


const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [size, setSize] = useState([])
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)

  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      const formdata = new FormData()
      image1 && formdata.append('image1', image1)
      image2 && formdata.append('image2', image2)
      image3 && formdata.append('image3', image3)
      image4 && formdata.append('image4', image4)

      formdata.append('description', description)
      formdata.append('price', price)
      formdata.append('sizes', JSON.stringify(size))
      formdata.append('name', name)
      formdata.append('category', category)
      formdata.append('subCategory', subCategory)
      formdata.append('bestseller', bestseller)

      const response = await axios.post(`${BACKEND_URL}/api/product/add`, formdata, {headers: {token}})
      if(response.data.success){
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      } else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg border border-emerald-100'> 
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-emerald-100">Add New Product</h2>
      <form onSubmit={submitHandler}
        className='flex flex-col items-start gap-5'>
        
        <div>
          <p className='mb-2 text-gray-700 font-medium'>Product Images (Max 4)</p>
          <div className='flex gap-4 flex-wrap'>
            <label htmlFor="image1" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-emerald-500 transition-colors">
              <img className='w-24 h-24 object-cover' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Image 1" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden required/>
            </label>
            <label htmlFor="image2" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-emerald-500 transition-colors">
              <img className='w-24 h-24 object-cover' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Image 2" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            <label htmlFor="image3" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-emerald-500 transition-colors">
              <img className='w-24 h-24 object-cover' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Image 3" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            <label htmlFor="image4" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-emerald-500 transition-colors">
              <img className='w-24 h-24 object-cover' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Image 4" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-gray-700 font-medium'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'
            type="text" placeholder='Enter product name' required />
        </div>

        <div className='w-full'>
          <p className='mb-2 text-gray-700 font-medium'>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'
            rows="4" placeholder='Enter product description' required />
        </div>

        <div className='flex flex-col gap-5 w-full md:flex-row md:gap-8'>
          
          <div className="flex-1">
            <p className='mb-2 text-gray-700 font-medium'>Category</p>
            <select onChange={(e) => setCategory(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500
               focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          
          <div className="flex-1">
            <p className='mb-2 text-gray-700 font-medium'>Subcategory</p>
            <select onChange={(e) => setSubCategory(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg
               focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'>
              <option value="Topwear">Topwear</option>
              <option value="Bottonwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="flex-1 max-w-full md:max-w-[200px]">
            <p className='mb-2 text-gray-700 font-medium'>Price</p>
            <input onChange={(e) => setPrice(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500
               focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'
              type="Number" placeholder='e.g., 99.99' required />
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-gray-700 font-medium'>Product Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
              <div key={s}
                onClick={() => setSize((prev) => prev.includes(s) ? prev.filter((size) => size !== s) : [...prev, s])}
                className={`px-4 py-2 cursor-pointer rounded-full font-semibold transition-all duration-150 text-sm
                            ${size.includes(s) 
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2 mt-2'>
          <input 
            onClick={() => setBestseller(bestseller => !bestseller)} 
            type="checkbox" 
            id='bestseller' 
            className='w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500' // Themed checkbox
            checked={bestseller}
          />
          <label className="cursor-pointer text-gray-700" htmlFor="bestseller"> Add to Bestseller List</label>
        </div>

        <button type="submit"
          className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full 
                      w-auto mt-4 transition-colors shadow-lg shadow-emerald-500/30'>
          ADD PRODUCT
        </button>
      </form>
    </div>
  )
}

Add.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Add