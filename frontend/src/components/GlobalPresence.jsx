const GlobalPresence = () => {
  const stats = [
    { label: "Global Hubs", value: "25+" },
    { label: "Happy Customers", value: "1M+" },
    { label: "Countries Served", value: "50+" },
    { label: "Partners Worldwide", value: "100+" }
  ]

  return (
    <section className="py-20 bg-[#1a1a1a] text-center sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <h2 className="text-3xl font-bold mb-14 text-gray-200">Our <span className='accent-text'>Global Reach</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#121212] shadow-xl rounded-xl p-8 
                                     border-b-2 border-emerald-500 hover:shadow-emerald-900/40 
                                     transition-all duration-300">
            <h3 className="text-5xl font-extrabold accent-text mb-2">{stat.value}</h3>
            <p className="text-gray-400 font-medium tracking-wider uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default GlobalPresence