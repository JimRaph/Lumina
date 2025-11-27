const Partners = () => {
  const brands = ["Nike", "Adidas", "Gucci", "Zara", "H&M"]

  return (
    <section className="py-20 bg-[#121212] text-center sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <h2 className="text-3xl font-bold mb-14 text-gray-200">
        Trusted by <span className='accent-text'>Leading Brands</span>
      </h2>
      <div className="flex justify-center gap-16 flex-wrap">
        {brands.map((brand, i) => (
            <div key={i} className="text-gray-500 text-2xl font-semibold 
                                  hover:text-emerald-400 
                                    transition-all duration-300 cursor-pointer tracking-wider">
                {brand}
            </div>
        ))}
      </div>
    </section>
  )
}
export default Partners