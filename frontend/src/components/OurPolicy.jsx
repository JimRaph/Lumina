import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-8 text-center py-20 text-xs sm:text-sm 
    md:text-base sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        
        <div className='p-8 rounded-xl bg-[#1a1a1a] shadow-xl border-t-2 border-emerald-500 hover:shadow-emerald-900 transition-shadow'>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5 filter brightness-200' alt='' />
            <p className='font-bold text-gray-100 uppercase tracking-wider'>Easy Exchange Policy</p>
            <p className='text-gray-400 mt-1'>We offer hassle free exchange policy</p>
        </div>
        
        <div className='p-8 rounded-xl bg-[#1a1a1a] shadow-xl border-t-2 border-emerald-500 hover:shadow-emerald-900 transition-shadow'>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5 filter brightness-200' alt='' />
            <p className='font-bold text-gray-100 uppercase tracking-wider'>7 Days Return Policy</p>
            <p className='text-gray-400 mt-1'>We provide 7 days free return policy</p>
        </div>
        
        <div className='p-8 rounded-xl bg-[#1a1a1a] shadow-xl border-t-2 border-emerald-500 hover:shadow-emerald-900 transition-shadow'>
            <img src={assets.support_img} className='w-12 m-auto mb-5 filter brightness-200' alt='' />
            <p className='font-bold text-gray-100 uppercase tracking-wider'>Best Customer Support</p>
            <p className='text-gray-400 mt-1'>We provide 24/7 customer support</p>
        </div>

    </div>
  )
}
export default OurPolicy