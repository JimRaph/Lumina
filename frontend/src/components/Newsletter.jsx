const Newsletter = () => {
  return (
    <div className='text-center sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-20'>
        <div className='bg-emerald-400 rounded-lg py-12 px-6 shadow-2xl shadow-emerald-700/60'>
            <p className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
            Subscribe and get 20% off
            </p>
            <p className='text-gray-800 mt-3 mb-8'>
                By subscribing you get 20% discount on all purchases!
            </p>

            <form className='w-full sm:w-2/3 lg:w-1/2 flex items-center gap-2 mx-auto bg-white p-1 rounded-full shadow-md'>
                <input className='w-full flex-1 outline-none px-4 py-3 rounded-l-full text-gray-800' type='email' placeholder='Enter your email'/>
                <button type='submit' className='bg-gray-900 text-white text-md px-8 py-3 rounded-full font-bold hover:bg-black transition-colors'>SUBSCRIBE</button>
            </form>
        </div>
    </div>
  )
}
export default Newsletter