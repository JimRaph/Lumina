import { assets } from '../assets/assets'

const FeaturedCategories = () => {
  
  const categories = [
    { name: "Men", image: assets.men},
    { name: "Women", image: assets.women },
    { name: "Accessories", image: assets.accessories},
    { name: "Shoes", image: assets.shoes }
  ]

  return (
    <section className="py-20 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-200">Shop by <span className='accent-text'>Collection</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className="relative h-72 rounded-xl overflow-hidden group cursor-pointer shadow-2xl transition duration-500 hover:scale-[1.02]"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80 group-hover:opacity-100" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center p-6">
              <span className='text-white font-extrabold text-xl tracking-widest uppercase group-hover:text-emerald-400 transition-colors'>{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default FeaturedCategories