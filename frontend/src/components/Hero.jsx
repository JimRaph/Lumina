import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row bg-[#1a1a1a] rounded-3xl overflow-hidden mt-4 shadow-xl'>
      
      <div className='w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0'>
        <div className='text-white p-6'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-emerald-400'></p>
                <p className='font-medium text-sm md:text-base accent-text tracking-widest'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight text-white'>
                Curated Styles for the <span className='accent-text'>Modern Edge</span>
            </h1>
            <div className='mt-6'>
                <button className='bg-emerald-400 text-gray-900 px-8 py-4 rounded-full font-extrabold text-lg 
                                 hover:bg-emerald-300 shadow-lg shadow-emerald-700/50 transition-all duration-300'>
                    SHOP NOW →
                </button>
            </div>
        </div>
      </div>

      <img src={assets.hero_img} className='w-full sm:w-1/2 object-cover object-center max-h-[500px]' alt='' />
    </div>
  )
}
export default Hero