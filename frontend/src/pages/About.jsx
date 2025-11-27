import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {

  return (
    <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      <div className='text-center pt-8 border-t border-gray-800'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-16 flex flex-col md:flex-row gap-16'>
        <div className='w-full md:max-w-[450px] rounded-xl overflow-hidden shadow-2xl shadow-gray-900'>
            <img className='w-full object-cover filter brightness-90' src={assets.about_img} alt='About Us' />
        </div>
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-400'>
          
          <p className='text-lg'>
            To create an unrivaled fashion experience that offers **comfort**, **style**, and **convenience** to every customer, while ensuring that the cost is just right for everyone. We strive to create a platform that offers the best in comfort, style, and convenience, while ensuring that the cost is just right for everyone.
          </p>
          
          <p>
            We are a passionate team with the goal to improve fashion in both our generation and future generations. Again we are here to provide affordability without losing luxury. We ensure the best of both worlds.
          </p>
          
          <b className='text-xl font-extrabold accent-text mt-2'>Our Mission</b>
          
          <p>
            You can break the bank and look fantabulous with us, and you can look incredible without breaking the bank too. We provide affordability without sacrificing the luxury feel.
          </p>
          
        </div>
      </div>

      <hr className='border-gray-800 my-10'/>

      <div className='text-center py-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
        
        <div className='bg-[#1a1a1a] rounded-xl p-8 shadow-2xl hover:shadow-emerald-900/40 transition-shadow flex flex-col gap-4 flex-1'>
          <b className='text-lg font-bold uppercase accent-text border-b-2 border-emerald-500/50 pb-2'>QUALITY ASSURANCE</b>
          <p className='text-gray-400'>
            We are a passionate team with the goal to improve fashion in both our generation and future generations. We ensure the **best of both worlds**, focusing on superior materials without the luxury price tag.
          </p>
        </div>
        
        <div className='bg-[#1a1a1a] rounded-xl p-8 shadow-2xl hover:shadow-emerald-900/40 transition-shadow flex flex-col gap-4 flex-1'>
          <b className='text-lg font-bold uppercase accent-text border-b-2 border-emerald-500/50 pb-2'>CONVENIENCE</b>
          <p className='text-gray-400'>
            Our platform offers an unrivaled shopping experience, designed for modern ease and speed. Browse collections, filter finds, and checkout effortlessly from any device.
          </p>
        </div>
        
        <div className='bg-[#1a1a1a] rounded-xl p-8 shadow-2xl hover:shadow-emerald-900/40 transition-shadow flex flex-col gap-4 flex-1'>
          <b className='text-lg font-bold uppercase accent-text border-b-2 border-emerald-500/50 pb-2'>EXCEPTIONAL CUSTOMER SERVICE</b>
          <p className='text-gray-400'>
            We stand behind every purchase. Our dedicated support team is available to assist you with everything from sizing questions to our hassle-free returns.
          </p>
        </div>

      </div>

      <Newsletter />
    </div>

  )
}

export default About