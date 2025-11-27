import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'
import { toast } from 'react-toastify'

const Content = () => {

  return (
    <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <div className='text-center pt-10 border-t border-gray-800'>
        <Title text1={'GET IN'} text2={'TOUCH'} />
      </div>

      <div className='my-16 flex flex-col justify-center md:flex-row gap-16 mb-28'>
        
        <div className='w-full md:max-w-[480px] rounded-xl overflow-hidden shadow-2xl shadow-gray-900'>
            <img 
                className='w-full object-cover filter brightness-90'
                src={assets.contact_img} 
                alt='Contact Us' 
            />
        </div>
        
        <div className='flex flex-col justify-center items-start gap-6'>
          
          <p className='font-bold text-xl accent-text uppercase tracking-widest'>Customer Support Hub</p>
          
          <div className='text-gray-400'>
            <p className='font-semibold text-lg text-gray-200 mb-1'>Our Store Location</p>
            <p className='text-gray-500'>
              Address: <br /><span className='text-gray-400'>26 Konaha Village</span>
            </p>
          </div>

          <div className='text-gray-400'>
            <p className='font-semibold text-lg text-gray-200 mb-1'>Reach Out</p>
            <p className='text-gray-500'>
              Tel: <span className='text-gray-400'>+234 813 765 1234</span><br />
              Email: <span className='text-gray-400 hover:text-emerald-400 cursor-pointer'>naruto@gmail.com</span>
            </p>
          </div>
          
          <hr className='w-2/4 border-gray-800'/>

          <p className='text-gray-200 font-bold text-xl mt-2'>
            Careers at <span className='accent-text'>LUMINA</span>
          </p>
          <p className='text-gray-500'>
            Learn more about our teams and job openings.
          </p>
          
          <button onClick={() => {
            toast.info('Check back later')
          }}
          className='bg-emerald-500 text-gray-900 px-10 py-3 text-sm font-bold rounded-full 
                     hover:bg-emerald-400 shadow-lg shadow-emerald-700/50 transition-all duration-300'>
            EXPLORE CAREERS
          </button>
        </div>
      </div>

      <div className='py-20 mt-8 border-t border-b border-gray-800'>
        <Newsletter />
      </div>
    </div>
  )
}

export default Content